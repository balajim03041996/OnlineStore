using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System;
using System.Threading.Tasks;

namespace OnlineStore.Functions.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendAsync(string subject, string body)
        {
            var user = Environment.GetEnvironmentVariable("SmtpUser");
            var password = Environment.GetEnvironmentVariable("SmtpPassword");
            var toAlertEmail = Environment.GetEnvironmentVariable("AlertEmailTo");

            if (string.IsNullOrEmpty(user) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(toAlertEmail))
            {
                throw new InvalidOperationException("SMTP settings are missing");
            }

            // build the email
            var message = new MimeMessage();
            message.From.Add(MailboxAddress.Parse(user));
            message.To.AddRange(InternetAddressList.Parse(toAlertEmail));
            message.Subject = subject;
            message.Body = new TextPart("plain") { Text = body };

            // connect, log in, send
            using var smtp = new SmtpClient();
            await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(user, password);
            await smtp.SendAsync(message);
            await smtp.DisconnectAsync(true);
        }
    }
}
