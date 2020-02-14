using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace CliftonSiteV2.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class AntiForgeryTokenResponse
    {
        private readonly RequestDelegate _next;
        private readonly IAntiforgery _antiForgeryService;

        public AntiForgeryTokenResponse(RequestDelegate next, IAntiforgery antiForgeryService)
        {
            _next = next;
            _antiForgeryService = antiForgeryService;
        }

        public Task Invoke(HttpContext httpContext)
        {
            if (httpContext.Request.Path.HasValue)
            {
                var token = _antiForgeryService.GetAndStoreTokens(httpContext);

                httpContext.Response.Cookies.Append(
                    "cac-id",
                    token.RequestToken,
                    new CookieOptions { HttpOnly = false, Secure = false, SameSite = SameSiteMode.Strict });
            }

            return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class AntiForgeryTokenResponseExtensions
    {
        public static IApplicationBuilder UseAntiForgeryTokenResponse(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AntiForgeryTokenResponse>();
        }
    }
}
