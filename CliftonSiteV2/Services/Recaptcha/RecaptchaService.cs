using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CliftonSiteV2.Configuration;
using NLog;

namespace CliftonSiteV2.Services.Recaptcha
{
    public class RecaptchaService : IRecaptchaService
    {
        private static ILogger logger = LogManager.GetLogger(nameof(RecaptchaService));

        private readonly IHttpClientFactory httpClientFactory;
        private readonly RecaptchaSettings recaptchaSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="RecaptchaService" /> class.
        /// </summary>
        /// <param name="httpClientFactory">The HTTP client factory.</param>
        /// <param name="recaptchaSettings">The recaptcha settings.</param>
        public RecaptchaService(IHttpClientFactory httpClientFactory, RecaptchaSettings recaptchaSettings)
        {
            this.httpClientFactory = httpClientFactory;
            this.recaptchaSettings = recaptchaSettings;
        }

        /// <summary>
        /// Determines whether [is valid response] [the specified captcha response].
        /// </summary>
        /// <param name="captchaResponse">The captcha response.</param>
        /// <returns>
        ///   <c>true</c> if [is valid response] [the specified captcha response]; otherwise, <c>false</c>.
        /// </returns>
        public async Task<bool> IsValidResponse(string captchaResponse, string remoteIP)
        {
            var handler = new HttpClientHandler();
            handler.UseProxy = false;

            var client = new HttpClient(handler);

            var content = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("secret", this.recaptchaSettings.PublicSecret),
                new KeyValuePair<string, string>("remoteip", remoteIP),
                new KeyValuePair<string, string>("response", captchaResponse)
            });

            var response = await client.PostAsync(this.recaptchaSettings.VerifyUrl, content);

            if (!response.IsSuccessStatusCode)
            {
                logger.Log(LogLevel.Error, "Recaptcha verification failed with HTTP error. Error Code: {0}, Message: {1}", response.StatusCode, response.ReasonPhrase);
                return false;
            }

            var recaptchaResponse = await response.Content.ReadAsAsync<RecaptchaResponse>();

            if (!recaptchaResponse.success)
            {
                logger.Log(LogLevel.Error, "Recaptcha verification failed with status check. hostName: {0}, Error Codes: {1}", recaptchaResponse.hostname, string.Join(',', recaptchaResponse.errorcodes));
            }

            return recaptchaResponse.success;
        }
    }
}
