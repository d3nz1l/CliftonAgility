using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CliftonSiteV2.Services.Email
{
    public class ClientFactory
    {
        private const string host = "mail.websitelive.net";
        private const int port = 587;
        private const string username = "club@cliftonagility.co.uk";
        private const string password = "M!a2r3k4";

        public SmtpClient Build()
        {
            return new SmtpClient
            {
                Host = host,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(username, password),
                Port = port,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };
        }
    }
}
