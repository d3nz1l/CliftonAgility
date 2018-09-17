using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CliftonSiteV2.Services.Email;

namespace CliftonSiteV2.Models
{
    public class MembershipForm : IEmailModel
    {
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        public string EmailAddress { get; set; }

        public string PhoneNumber { get; set; }

        public EmailType MessageType { get; set; } = EmailType.MembershipForm;

        public string DogName { get; set; }

        public string Breed { get; set; }

        public DateTime DogDateOfBirth { get; set; }

        public string Message { get; set; }
    }
}
