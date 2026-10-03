using Azure.Messaging.ServiceBus;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace OnlineStore.Functions.OnlineStore
{
    public class OrderEmailFunction
    {
        private readonly ILogger<OrderEmailFunction> _logger;

        public OrderEmailFunction(ILogger<OrderEmailFunction> logger)
        {
            _logger = logger;
        }

        [Function("OrderEmail")]
        public void Run(
            [ServiceBusTrigger("orders", Connection = "ServiceBusConnection")] ServiceBusReceivedMessage message)
        {
            string body = message.Body.ToString();

            _logger.LogInformation("Received message {MessageId}, attempt {Attempt}: {Body}",
                message.MessageId, message.DeliveryCount, body);

            // demo: pretend the email service is down for this message
            if (body.Contains("fail"))
            {
                throw new InvalidOperationException("Simulated email service failure");
            }

            _logger.LogInformation("Email sent for order: {Body}", body);
        }
    }
}
