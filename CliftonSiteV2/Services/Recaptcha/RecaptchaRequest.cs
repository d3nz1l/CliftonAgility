using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CliftonSiteV2.Services.Recaptcha
{
    public class RecaptchaRequest
    {
        public string secret { get; set; }

        public string response { get; set; }

        public string remoteip { get; set; }
    }
}
