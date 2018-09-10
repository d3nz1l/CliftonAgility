using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CliftonSiteV2.Configuration
{
    public class RecaptchaSettings
    {
        /// <summary>
        /// Gets or sets the public secret.
        /// </summary>
        public string PublicSecret { get; set; }

        /// <summary>
        /// Gets or sets the verify URL.
        /// </summary>
        public string VerifyUrl { get; set; }
    }
}
