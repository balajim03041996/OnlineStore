using OnlineStore.API.DTOs;

namespace OnlineStore.API.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync();
    }
}
