using System;
using CliftonSiteV2.Services.Email;

namespace CliftonSiteV2.Models
{
    public class MembershipForm : EmailModel
    {
        public MembershipForm()
        {
            this.MessageType = EmailType.MembershipForm;
        }

        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        public string PhoneNumber { get; set; }

        public string DogName { get; set; }

        public string Breed { get; set; }

        public DateTime DogDateOfBirth { get; set; }

        public string Message { get; set; }
    }
}
