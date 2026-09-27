using Microsoft.EntityFrameworkCore;
using OnlineStore.API.Data;
using OnlineStore.API.DTOs;

namespace OnlineStore.API.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _DBContect;
        public ProductService(AppDbContext DBContect)// Dependency Injection the dbcontext
        {
            _DBContect = DBContect;
        }
        public async Task<List<ProductDto>> GetAllProductsAsync()
        {
            return await _DBContect.Products.AsNoTracking().Select(a => new ProductDto
            {
                Id = a.Id,
                Name = a.Name,
                Description = a.Description,
                CategoryId = a.CategoryId,
                CategoryName = a.Category.Name,// EF turns this into a sql join query to get the category name from the category table
                Price = a.Price,
                StockQuantity = a.StockQuantity,
                ImageUrl = a.ImageUrl
            }).ToListAsync();
        }
        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            return await _DBContect.Products.AsNoTracking().Where(a => a.Id == id).Select(b => new ProductDto
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                CategoryId = b.CategoryId,
                CategoryName = b.Category.Name,
                Price = b.Price,
                StockQuantity = b.StockQuantity,
                ImageUrl = b.ImageUrl
            }).FirstOrDefaultAsync();
        }
        public async Task<ProductDto?> CreateProductAsync(CreateProductDto createProductDto)
        {
            var categoryExists = await _DBContect.Categories.AnyAsync(x=> x.Id== createProductDto.CategoryId);
            if (!categoryExists)
            {
                return null;
            }
            var product = new Entities.Product
            {
                Name = createProductDto.Name,
                Description = createProductDto.Description,
                Price = createProductDto.Price,
                CategoryId = createProductDto.CategoryId,
                ImageUrl = createProductDto.ImageUrl,
                StockQuantity = createProductDto.StockQuantity
            };
            _DBContect.Products.Add(product);
            await _DBContect.SaveChangesAsync();

            return await GetProductByIdAsync(product.Id);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _DBContect.Products.FindAsync(id);
            if (product is null)
            {
                return false;
            }
            _DBContect.Products.Remove(product);
            await _DBContect.SaveChangesAsync();
            return true;
        }
    }
}
