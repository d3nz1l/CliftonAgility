using System;
using CliftonSiteV2.Configuration;
using CliftonSiteV2.Middleware;
using CliftonSiteV2.Services.Email;
using CliftonSiteV2.Services.Recaptcha;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Unity;

namespace CliftonSiteV2
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAntiforgery(opts => opts.HeaderName = "X-XSRF-TOKEN");

            services
                .AddMvc(cfg => cfg.Filters.Add<AutoValidateAntiforgeryTokenAttribute>())
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddHttpClient();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IAntiforgery antiforgery)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.Use(next => context =>
            {
                if (!context.Request.Cookies.ContainsKey("X-XSRF-TOKEN"))
                {
                    // We can send the request token as a JavaScript-readable cookie, and Angular will use it by default.
                    var tokens = antiforgery.GetAndStoreTokens(context);
                    context.Response.Cookies.Append("X-XSRF-TOKEN", tokens.RequestToken,
                        new CookieOptions() { HttpOnly = false, Secure = false });
                }

                return next(context);
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseAntiForgeryTokenResponse();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }

        public void ConfigureContainer(IUnityContainer container)
        {
            // Could be used to register more types
            container.RegisterType<EmailService>();
            container.RegisterType<IRecaptchaService, RecaptchaService>();

            // Register settings
            this.RegisterConfigurationInstance<RecaptchaSettings>(container, "RecaptchaSettings");
        }

        private void RegisterConfigurationInstance<T>(IUnityContainer container, string sectionName)
            where T : new()
        {
            var config = new T();

            this.Configuration.Bind(sectionName, config);

            container.RegisterInstance(typeof(T), config);
        }
    }
}
