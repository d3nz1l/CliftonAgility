using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CliftonSiteV2.Services.Email;

namespace CliftonSiteV2.Models
{
    /// <summary>
    /// A message class
    /// </summary>
    public class EmailMessage : IEmailModel
    {
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        public string EmailAddress { get; set; }

        public string PhoneNumber { get; set; }

        public EmailType MessageType { get; set; }

        public string Text { get; set; }
    }
}
