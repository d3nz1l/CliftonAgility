using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Primitives;

namespace CliftonSiteV2.Services.Recaptcha
{
    /// <summary>
    /// Validates incoming requests recaptcha response.
    /// </summary>
    /// <seealso cref="Microsoft.AspNetCore.Mvc.Filters.ActionFilterAttribute" />
    public class ValidateRecaptchaAttribute : TypeFilterAttribute
    {
        public ValidateRecaptchaAttribute()
            : base(typeof(ValidateRecaptchaImpl))
        {
        }

        private class ValidateRecaptchaImpl : ActionFilterAttribute
        {
            private const string RecaptchaRequestKey = "recaptcha-response";

            private readonly IRecaptchaService recaptchaService;

            public ValidateRecaptchaImpl(IRecaptchaService recaptchaService)
            {
                this.recaptchaService = recaptchaService;
            }

            /// <summary>
            /// </summary>
            /// <param name="context"></param>
            /// <param name="next"></param>
            /// <returns></returns>
            /// <inheritdoc />
            public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
            {
                try
                {
                    var response = this.GetRecaptchaResponse(context);

                    if (string.IsNullOrEmpty(response))
                    {
                        context.ModelState.AddModelError(RecaptchaRequestKey, "No recaptcha response found in request.");

                        await base.OnActionExecutionAsync(context, next);
                    }

                    var isValidResponse = await this.recaptchaService.IsValidResponse(response, context.HttpContext.Connection.RemoteIpAddress.ToString());

                    if (!isValidResponse)
                    {
                        context.ModelState.AddModelError(RecaptchaRequestKey, "No recaptcha response is not valid.");
                    }
                }
                catch (Exception ex)
                {
                    context.ModelState.AddModelError(RecaptchaRequestKey, $"Exception Thrown validating recaptcha. {ex.Message}");
                }

                await base.OnActionExecutionAsync(context, next);
            }

            private string GetRecaptchaResponse(ActionExecutingContext context)
            {
                StringValues recaptchaResponse;

                if (context.HttpContext.Request.HasFormContentType)
                {
                    context.HttpContext.Request.Form.TryGetValue(RecaptchaRequestKey, out recaptchaResponse);
                }

                if (!recaptchaResponse.Any())
                {
                    context.HttpContext.Request.Query.TryGetValue(RecaptchaRequestKey, out recaptchaResponse);
                }

                if (!recaptchaResponse.Any())
                {
                    context.HttpContext.Request.Headers.TryGetValue(RecaptchaRequestKey, out recaptchaResponse);
                }

                return recaptchaResponse.FirstOrDefault();
            }

            private void AddModelError(ModelStateDictionary modelState, string errorMessage)
            {
                modelState.AddModelError(RecaptchaRequestKey, errorMessage);
            }
        }
    }
}
