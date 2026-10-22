using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Amqp.Framing;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using OnlineStore.Functions.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace OnlineStore.Functions.OnlineStore
{
    public class DailyLowStockFunction
    {
        private readonly ILogger<DailyLowStockFunction> _logger;
        private readonly ILowStockService _lowStockService;
        private readonly ServiceBusClient _serviceBusClient;

        public DailyLowStockFunction(ILogger<DailyLowStockFunction> logger, ILowStockService lowStockService, ServiceBusClient serviceBusClient)
        {
            _logger = logger;
            _lowStockService = lowStockService;
            _serviceBusClient = serviceBusClient;
        }

        [Function("DailyLowStock")]
        public async Task Run([TimerTrigger("%LowStockSchedule%")] TimerInfo timer)
        {
            _logger.LogInformation("stock check ran at {Time}", DateTime.Now);

            int threshold = int.TryParse(Environment.GetEnvironmentVariable("LowStockThreshold"), out var t) ? t : 20;
            try
            {
                var lowStock = await _lowStockService.GetLowStockAsync(threshold);

                if (lowStock.Count == 0)
                {
                    _logger.LogInformation("All products have enough stock");
                }
                else
                {
                    _logger.LogInformation("Found {Count} low-stock products below {Threshold}", lowStock.Count, threshold);
                    foreach (var item in lowStock)
                    {
                        _logger.LogInformation("{Name}: {Qty} left", item.Name, item.StockQuantity);
                    }
                    var json = JsonSerializer.Serialize(lowStock);
                    await using var sender = _serviceBusClient.CreateSender(QueueNames.LowStockAlerts);
                    await sender.SendMessageAsync(new ServiceBusMessage(json));
                    _logger.LogInformation("Low stock alert sent to queue");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Daily stock check failed");
            }

            _logger.LogInformation("Next run at {Next}", timer.ScheduleStatus?.Next);
        }

    }
}
