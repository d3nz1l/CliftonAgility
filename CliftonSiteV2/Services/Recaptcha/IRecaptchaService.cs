using System.Threading.Tasks;

namespace CliftonSiteV2.Services.Recaptcha
{
    public interface IRecaptchaService
    {
        Task<bool> IsValidResponse(string captchaResponse, string remoteIP);
    }
}