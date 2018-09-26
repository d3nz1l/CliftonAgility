using CliftonSiteV2.Services.Email;

namespace CliftonSiteV2.Models
{
    /// <summary>
    /// A message class
    /// </summary>
    public class EmailMessage : EmailModel
    {
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        public string Name { get; set; }

        public string PhoneNumber { get; set; }

        public string Text { get; set; }
    }
}
