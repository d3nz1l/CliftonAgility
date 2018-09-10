using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CliftonSiteV2.Services.Recaptcha
{
    public class RecaptchaResponse
    {
        public bool success { get; set; }

        public DateTime challenge_ts { get; set; }

        public string hostname { get; set; }

        public string[] errorcodes { get; set; }
    }
}
