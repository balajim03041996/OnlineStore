using OnlineStore.API.DTOs;

namespace OnlineStore.API.Services
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllProductsAsync();
        Task<ProductDto?> GetProductByIdAsync(int id);

        Task<ProductDto?> CreateProductAsync(CreateProductDto createProductDto);

        Task<bool> DeleteProductAsync(int id);

        Task<ProductDto?> UpdateProductAsync(int id, UpdateProductDto updateProductDto);
    }
}
