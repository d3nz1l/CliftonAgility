using System.Threading.Tasks;
using CliftonSiteV2.Models;
using CliftonSiteV2.Services.Email;
using CliftonSiteV2.Services.Recaptcha;
using Microsoft.AspNetCore.Mvc;

namespace CliftonSiteV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ValidateRecaptcha]
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