using Microsoft.EntityFrameworkCore;
using OnlineStore.API.Entities;

namespace OnlineStore.API.Data
{
    public class APPDbcontext :DbContext
    {
        //constructor 
        public APPDbcontext(DbContextOptions<APPDbcontext> options) : base(options)
        { }
        public DbSet<Category> Categories  => Set<Category>();
        public DbSet<Product> Products  => Set<Product>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure the relationship between Category 
            //rules for Category 
            modelBuilder.Entity<Category>(x => x.Property(a => a.Name).HasMaxLength(100).IsRequired());// max name 100 letters
            modelBuilder.Entity<Category>(x => x.HasIndex(a => a.Id).IsUnique());// id should be unique

            //rules for Product
            modelBuilder.Entity<Product>(x => x.Property(a => a.Name).HasMaxLength(150).IsRequired());// max name 150 letters
            modelBuilder.Entity<Product>(x => x.Property(a => a.Price).HasPrecision(18, 2));// price should be 18 digits and 2 decimal places
            modelBuilder.Entity<Product>(x => x.Property(a => a.StockQuantity).HasDefaultValue(0));// stock quantity should be 0 by default
            modelBuilder.Entity<Product>(x => x.Property(a => a.CreatedAt).HasDefaultValueSql("GETDATE()"));// created at should be current date by default

            modelBuilder.Entity<Product>( x=> x.HasOne(a=> a.Category).WithMany(b=> b.Products).HasForeignKey(c=> c.CategoryId).OnDelete(DeleteBehavior.Restrict));// cant delete category if there are products in that category



        }
}
