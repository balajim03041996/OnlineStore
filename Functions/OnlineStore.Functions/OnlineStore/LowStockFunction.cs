using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using OnlineStore.Functions.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace OnlineStore.Functions.OnlineStore
{
    public class LowStockFunction
    {
        private readonly ILogger<LowStockFunction> _logger;
        private readonly ILowStockService _lowStockService;
        public LowStockFunction(ILogger<LowStockFunction> logger, ILowStockService lowStockService)
        {
            _logger = logger;
            _lowStockService = lowStockService;
        }


        [Function("LowStock")]
        public async Task<IActionResult> Run(
          [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req)
        {
            // Define the low stock threshold
            int threshold = int.TryParse(req.Query["threshold"], out var t) ? t : 40;
            try
            {
                var lowStock = await _lowStockService.GetLowStockAsync(threshold);

                _logger.LogInformation("Found {Count} low-stock products below {Threshold}", lowStock.Count, threshold);
                return new OkObjectResult(lowStock);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Low stock check failed");
                return new ObjectResult("...") { StatusCode = 500 };
            }
        }
        // only the fields we need from the API's JSON
        public record ProductStock(int Id, string Name, int StockQuantity);
    }
}
