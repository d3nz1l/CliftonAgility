using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CliftonSiteV2.Models;
using Microsoft.Extensions.Logging;
using NLog;

namespace CliftonSiteV2.Services.Email
{
    public class EmailService
    {
        private readonly ClientFactory clientFactory;
        private readonly MessageFactory messageFactory;
        private readonly ILogger<EmailService> logger;

        public EmailService(ClientFactory clientFactory, MessageFactory messageFactory, ILogger<EmailService> logger)
        {
            this.clientFactory = clientFactory;
            this.messageFactory = messageFactory;
            this.logger = logger;
        }

        public async Task Send(EmailMessage message)
        {
            using (var client = this.clientFactory.Build())
            {
                var messages = await this.messageFactory.BuildMessagesAsync(message);

                foreach (var email in messages)
                {
                    try
                    {
                        /////await client.SendMailAsync(email);
                    }
                    catch (Exception ex)
                    {
                        this.logger.LogError(ex, "Failed sending email. Type; {0}, Error: {1}", message.MessageType, ex.Message);
                    }
                }
            }
        }
    }
}
