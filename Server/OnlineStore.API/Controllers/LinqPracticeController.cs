using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineStore.API.Data;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LinqPracticeController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public LinqPracticeController(AppDbContext DBContect)// Dependency Injection the dbcontext
        {
            _appDbContext = DBContect;
        }
        [HttpGet("q1")]
        public async Task<IActionResult> Q1()
        {
            var items = await _appDbContext.Products.AsNoTracking().Where(x => x.Price > 1000).ToListAsync();
            return Ok(items);
        }

        [HttpGet("q2")]
        public async Task<IActionResult> Q2()
        {
            var items = await _appDbContext.Products.AsNoTracking().Where(x => x.StockQuantity < 1).ToListAsync();
            return Ok(items);
        }

        [HttpGet("q3")]
        public async Task<IActionResult> Q3()
        {
            var items = await _appDbContext.Products.AsNoTracking().OrderByDescending(x => x.Price).ToListAsync();
            return Ok(items);
        }

        [HttpGet("q4")]
        public async Task<IActionResult> Q4()
        {
            var items = await _appDbContext.Products.AsNoTracking().Select(x => new { x.Name, x.Price }).ToListAsync();
            return Ok(items);
        }

        [HttpGet("q5")]
        public async Task<IActionResult> Q5(string? search)
        {
            var query = _appDbContext.Products.AsNoTracking();
            // filter only when a search word is given
            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(x => x.Name.Contains(search));
            }
            var items = await query.ToListAsync();
            return Ok(items);
        }
    }
}
