using System;
using System.Threading.Tasks;
using CliftonSiteV2.Models;
using CliftonSiteV2.Services.Email;
using CliftonSiteV2.Services.Recaptcha;
using Microsoft.AspNetCore.Mvc;
using NLog;

namespace CliftonSiteV2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ValidateRecaptcha]
    public class MessageController : ControllerBase
    {
        private static ILogger logger = LogManager.GetLogger(nameof(MessageController));
        private readonly EmailService emailService;

        public MessageController(EmailService emailService)
        {
            this.emailService = emailService;
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> Email(EmailMessage message)
        {
            try
            {
                if (!this.ModelState.IsValid)
                {
                    return this.BadRequest(this.ModelState);
                }

                await this.emailService.Send(message);

                return this.Ok();
            }
            catch (Exception ex)
            {
                logger.Error(ex, ex.Message);
                this.ModelState.AddModelError("Send Error", "Message sending failed with an error.");

                return this.BadRequest(this.ModelState);
            }
        }

        [Route("[action]")]
        [HttpPost]
        public async Task<IActionResult> MemberForm(MembershipForm membersForm)
        {
            try
            {
                if (!this.ModelState.IsValid)
                {
                    return this.BadRequest(this.ModelState);
                }

                await this.emailService.Send(membersForm);

                return this.Ok();
            }
            catch (Exception ex)
            {
                logger.Error(ex, ex.Message);
                this.ModelState.AddModelError("Send Error", "Message sending failed with an error.");

                return this.BadRequest(this.ModelState);
            }
        }
    }
}