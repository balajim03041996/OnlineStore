using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
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
        private static readonly HttpClient _http = new HttpClient();
        public LowStockFunction(ILogger<LowStockFunction> logger)
        {
            _logger = logger;
        }


        [Function("LowStock")]
        public async Task<IActionResult> Run(
          [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequest req)
        {
            // Define the low stock threshold
            int threshold = int.TryParse(req.Query["threshold"], out var t) ? t : 40;

            string? apiBaseUrl = Environment.GetEnvironmentVariable("ApiBaseUrl");
            if (string.IsNullOrEmpty(apiBaseUrl))
            {
                _logger.LogError("ApiBaseUrl setting is missing");
                return new ObjectResult("ApiBaseUrl setting is missing") { StatusCode = 500 };
            }
            var products = await _http.GetFromJsonAsync<List<ProductStock>>($"{apiBaseUrl}/products");

            var lowStock = products!.Where(p => p.StockQuantity < threshold).ToList();

            _logger.LogInformation("Found {Count} low-stock products below {Threshold}", lowStock.Count, threshold);
            return new OkObjectResult(lowStock);

        }
        // only the fields we need from the API's JSON
        public record ProductStock(int Id, string Name, int StockQuantity);
    }
}
