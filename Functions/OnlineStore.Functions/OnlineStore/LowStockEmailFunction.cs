using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using static OnlineStore.Functions.OnlineStore.LowStockFunction;

namespace OnlineStore.Functions.OnlineStore
{
    public class LowStockEmailFunction
    {
        private readonly ILogger<LowStockEmailFunction> _logger;

        public LowStockEmailFunction(ILogger<LowStockEmailFunction> logger)
        {
            _logger = logger;
        }

        [Function("LowStockEmail")]
        public void Run(
            [ServiceBusTrigger(QueueNames.LowStockAlerts, Connection = "LowStockBusConnection")] ServiceBusReceivedMessage message)
        {
            string body = message.Body.ToString();

            // JSON text back into the product list
            var items = JsonSerializer.Deserialize<List<ProductStock>>(body) ?? new List<ProductStock>();

            _logger.LogInformation("Received low stock alert with {Count} products, attempt {Attempt}",
                items.Count, message.DeliveryCount);

            foreach (var item in items)
            {
                _logger.LogInformation("{Name}: {Qty} left", item.Name, item.StockQuantity);
            }

            // step 5: send the real email here
        }
    }
}
