using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using CliftonSiteV2.Models;
using CliftonSiteV2.Services.Email.Messages;

namespace CliftonSiteV2.Services.Email
{
    public class MessageFactory
    {
        private readonly TemplateBuilder templateBuilder;

        public MessageFactory(TemplateBuilder templateBuilder)
        {
            this.templateBuilder = templateBuilder;
        }

        public async Task<IEnumerable<MailMessage>> BuildMessagesAsync<T>(T messageModel)
            where T : IEmailModel
        {
            var clubAddress = this.GetClubAddress(messageModel.MessageType);

            var messageContent = this.templateBuilder.BuildMessageAsync(messageModel.MessageType.ToString(), messageModel);
            var confirmationContent = this.templateBuilder.BuildMessageAsync($"{messageModel.MessageType.ToString()}Confirmation", messageModel);

            await Task.WhenAll(messageContent, confirmationContent);

            var messageToTheClub = this.CreateMessage(messageModel.EmailAddress, clubAddress, $"{messageModel.MessageType} Request from the Website", messageContent.Result);
            var messageToUser = this.CreateMessage(clubAddress, messageModel.EmailAddress, $"{messageModel.MessageType} Request from the Clifton Agility Club", messageContent.Result);

            return new List<MailMessage>
            {
                messageToTheClub,
                messageToUser
            };
        }

        private MailMessage CreateMessage(string from, string to, string subject, MessageContent content)
        {
            var message = new MailMessage
            {
                From = new MailAddress(from),
                Body = content.TextContent,
                Subject = subject
            };

            message.To.Add(to);
            message.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(content.TextContent, new ContentType("text/html")));

            return message;
        }

        private string GetClubAddress(EmailType emailType)
        {
            switch (emailType)
            {
                case EmailType.Membership:

                    return EmailAddresses.Membership;

                default:

                    return EmailAddresses.Information;
            }
        }
    }
}
