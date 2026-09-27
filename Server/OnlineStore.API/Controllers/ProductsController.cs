using Microsoft.AspNetCore.Mvc;
using OnlineStore.API.DTOs;
using OnlineStore.API.Services;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }
        // Get api/products – get all products
        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product is null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct(CreateProductDto createProductDto)
        {
            var product = await _productService.CreateProductAsync(createProductDto);
            if (product is null)
            {
                return BadRequest($"Category {createProductDto.CategoryId} does not exist.");
            }
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);// for post 201 with location header
        }
    }
}
