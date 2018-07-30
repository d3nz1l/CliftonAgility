using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CliftonSiteV2.Services.Email
{
    public interface IEmailModel
    {
        EmailType MessageType { get; set; }

        string EmailAddress { get; set; }
    }
}
