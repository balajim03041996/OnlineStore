using Microsoft.AspNetCore.Mvc;
using OnlineStore.API.DTOs;
using OnlineStore.API.Services;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService; 

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CategoryDto>>> GetAllCategories()
        {
            var categories= await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }
    }
}
