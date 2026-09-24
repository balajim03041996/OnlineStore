using Microsoft.EntityFrameworkCore;
using OnlineStore.API.Entities;

namespace OnlineStore.API.Data
{
    public class AppDbContext : DbContext
    {
        //constructor 
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { }
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<Product> Products => Set<Product>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure the relationship between Category 
            //rules for Category 
            modelBuilder.Entity<Category>(x => x.Property(a => a.Name).HasMaxLength(100).IsRequired());// max name 100 letters
            modelBuilder.Entity<Category>(x => x.HasIndex(a => a.Name).IsUnique());// name should be unique

            //rules for Product
            modelBuilder.Entity<Product>(x => x.Property(a => a.Name).HasMaxLength(150).IsRequired());// max name 150 letters
            modelBuilder.Entity<Product>(x => x.Property(a => a.Price).HasPrecision(18, 2));// price should be 18 digits and 2 decimal places
            modelBuilder.Entity<Product>(x => x.Property(a => a.StockQuantity).HasDefaultValue(0));// stock quantity should be 0 by default
            modelBuilder.Entity<Product>(x => x.Property(a => a.CreatedAt).HasDefaultValueSql("SYSUTCDATETIME()"));// created at should be current date by default

            modelBuilder.Entity<Product>(x => x.HasOne(a => a.Category).WithMany(b => b.Products).HasForeignKey(c => c.CategoryId).OnDelete(DeleteBehavior.Restrict));// cant delete category if there are products in that category


            // ---------- Seed data ----------
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Electronics", Description = "Phones, laptops and gadgets" },
                new Category { Id = 2, Name = "Books", Description = "Fiction and technology books" },
                new Category { Id = 3, Name = "Clothing", Description = "Men and women apparel" },
                new Category { Id = 4, Name = "Home", Description = "Kitchen and home essentials" }
            );

            // Seed products with a fixed CreatedAt date for consistency
            var seedDate = new DateTime(2026, 9, 24, 0, 0, 0, DateTimeKind.Utc);
            modelBuilder.Entity<Product>().HasData(
                new Product { Id = 1, Name = "iPhone 15", Description = "Latest Apple smartphone", CategoryId = 1, Price = 999.99m, StockQuantity = 50, ImageUrl = "https://picsum.photos/seed/iphone/400/300", CreatedAt = seedDate },
                new Product { Id = 2, Name = "Samsung Galaxy S23", Description = "Flagship Samsung smartphone", CategoryId = 1, Price = 899.99m, StockQuantity = 30, ImageUrl = "https://picsum.photos/seed/galaxy/400/300", CreatedAt = seedDate },
                new Product { Id = 3, Name = "The Great Gatsby", Description = "Classic novel by F. Scott Fitzgerald", CategoryId = 2, Price = 10.99m, StockQuantity = 100, ImageUrl = "https://picsum.photos/seed/gatsby/400/300", CreatedAt = seedDate },
                new Product { Id = 4, Name = "Men's Unitedcolors of benetton T-Shirt", Description = "Comfortable cotton t-shirt", CategoryId = 3, Price = 19.99m, StockQuantity = 200, ImageUrl = "https://picsum.photos/seed/shirt/400/300", CreatedAt = seedDate },
                new Product { Id = 5, Name = "Blender", Description = "High-speed kitchen blender", CategoryId = 4, Price = 49.99m, StockQuantity = 75, ImageUrl = "https://picsum.photos/seed/blender/400/300", CreatedAt = seedDate }
            );

        }
    }
}
