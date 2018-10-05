using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;
using CliftonSiteV2.Services.Email.Messages;
using NLog;

namespace CliftonSiteV2.Services.Email
{
    public class MessageFactory
    {
        private static ILogger logger = LogManager.GetLogger(nameof(MessageFactory));
        private readonly TemplateBuilder templateBuilder;

        public MessageFactory(TemplateBuilder templateBuilder)
        {
            this.templateBuilder = templateBuilder;
        }

        public async Task<IEnumerable<MailMessage>> BuildMessagesAsync<T>(T messageModel)
            where T : EmailModel
        {
            var clubAddress = this.GetClubAddress(messageModel.MessageType);

            var messageToTheClub = this.BuildMessageAsync(messageModel.MessageType.ToString(), messageModel, clubAddress, clubAddress, messageModel.EmailAddress);
            var messageToUser = this.BuildMessageAsync("Confirmation", messageModel, clubAddress, messageModel.EmailAddress, clubAddress);

            await Task.WhenAll(messageToTheClub, messageToUser);

            return new List<MailMessage>
            {
                messageToTheClub.Result,
                messageToUser.Result
            };
        }

        private async Task<MailMessage> BuildMessageAsync<T>(string messageType, T messageModel, string fromAddress, string toAddress, string replyToAddress)
            where T : EmailModel
        {
            try
            {
                var messageContent = await this.templateBuilder.BuildMessageAsync(messageType, messageModel);

                var message = this.CreateMessage(fromAddress, toAddress, replyToAddress, $"{messageModel.MessageType} Request from the Website", messageContent);

                return message;
            }
            catch (Exception ex)
            {
                logger.Log(LogLevel.Error, ex, "Failed creating message. Message: {0}", messageType);
                throw ex;
            }
        }

        private MailMessage CreateMessage(string from, string to, string reply, string subject, MessageContent content)
        {
            var message = new MailMessage
            {
                From = new MailAddress(from),
                Body = content.TextContent,
                Subject = subject
            };

            message.ReplyToList.Add(reply);

            message.To.Add(to);
            message.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(content.HtmlContent, new ContentType("text/html")));

            return message;
        }

        private string GetClubAddress(EmailType emailType)
        {
            switch (emailType)
            {
                case EmailType.Membership:
                case EmailType.MembershipForm:

                    return EmailAddresses.Membership;

                default:

                    return EmailAddresses.Information;
            }
        }
    }
}
