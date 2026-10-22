using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using OnlineStore.Functions.Services;
using System.Text.Json;
using static OnlineStore.Functions.OnlineStore.LowStockFunction;

namespace OnlineStore.Functions.OnlineStore
{
    public class LowStockEmailFunction
    {
        private readonly ILogger<LowStockEmailFunction> _logger;
        private readonly IEmailService _emailService;

        public LowStockEmailFunction(ILogger<LowStockEmailFunction> logger, IEmailService emailService)
        {
            _logger = logger;
            _emailService = emailService;
        }

        [Function("LowStockEmail")]
        public async Task Run(
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
            var lines = items.Select(x => $"{x.Name}: {x.StockQuantity} left");
            var emailBody = "These products are low on stock:\n\n" + string.Join("\n", lines);
            await _emailService.SendAsync($"Low stock alert: {items.Count} products", emailBody);
            _logger.LogInformation("low stock email sent");// no try becuase failure should escpare , so service bus retry 
        }
    }
}
