using Microsoft.EntityFrameworkCore;
using OnlineStore.API.Data;
using OnlineStore.API.DTOs;

namespace OnlineStore.API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _DBcontext;

        public CategoryService(AppDbContext context)
        {
            _DBcontext = context;
        }
        public async Task<List<CategoryDto>> GetAllCategoriesAsync()
        {
            return await _DBcontext.Categories.AsNoTracking().Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.Name,
                Description = c.Description
            }).ToListAsync();
        }
    }
}
