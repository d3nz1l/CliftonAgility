using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CliftonSiteV2.Models;
using CliftonSiteV2.Services.Email;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CliftonSiteV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly EmailService emailService;

        public MessageController(EmailService emailService)
        {
            this.emailService = emailService;
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> Email(EmailMessage message)
        {
            if (!ModelState.IsValid)
            {
                return this.BadRequest();
            }

            await this.emailService.Send(message);

            return this.Ok();
        }
    }
}