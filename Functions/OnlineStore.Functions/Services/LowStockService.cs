using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OnlineStore.Functions.OnlineStore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using static OnlineStore.Functions.OnlineStore.LowStockFunction;

namespace OnlineStore.Functions.Services
{
    public class LowStockService : ILowStockService
    {
        private readonly ILogger<LowStockService> _logger;

        private static readonly HttpClient _http = new HttpClient();

        public LowStockService(ILogger<LowStockService> logger)
        {
            _logger = logger;
        }
        public async Task<List<ProductStock>> GetLowStockAsync(int threshold)
        {
            string? apiBaseUrl = Environment.GetEnvironmentVariable("ApiBaseUrl");
            if (string.IsNullOrEmpty(apiBaseUrl))
            {
                _logger.LogError("ApiBaseUrl setting is missing");
                throw new InvalidOperationException("ApiBaseUrl setting is missing");
            }
            var products = await _http.GetFromJsonAsync<List<ProductStock>>($"{apiBaseUrl}/products");

            var lowStock = products!.Where(p => p.StockQuantity < threshold).ToList();
            return lowStock;
        }
    }
}
