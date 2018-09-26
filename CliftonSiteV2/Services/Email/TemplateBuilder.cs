using System.Threading.Tasks;
using CliftonSiteV2.Services.Email.Messages;
using RazorLight;

namespace CliftonSiteV2.Services.Email
{
    public class TemplateBuilder
    {
        public async Task<MessageContent> BuildMessageAsync<T>(string templateName, T model)
        {
            var templateEngine = this.BuildEngine();

            var htmlTask = templateEngine.CompileRenderAsync<T>(this.GetFullTemplateName(templateName, TemplateType.Html), model);
            var textTask = templateEngine.CompileRenderAsync<T>(this.GetFullTemplateName(templateName, TemplateType.Text), model);

            await Task.WhenAll(htmlTask, textTask);

            var template = new MessageContent
            {
                HtmlContent = htmlTask.Result,
                TextContent = textTask.Result
            };

            return template;
        }

        private RazorLightEngine BuildEngine()
        {
            return new RazorLightEngineBuilder()
                .UseEmbeddedResourcesProject(this.GetType())
                .UseMemoryCachingProvider()
                .Build();
        }

        private string GetFullTemplateName(string templateName, TemplateType templateType)
        {
            return $"Services.Email.Messages.Templates.{templateName}.{templateType}.cshtml";
        }

        private enum TemplateType
        {
            Html,
            Text
        }
    }
}
