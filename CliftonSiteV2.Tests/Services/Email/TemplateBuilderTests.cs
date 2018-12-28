using CliftonSiteV2.Models;
using CliftonSiteV2.Services.Email;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CliftonSiteV2.Tests.Services.Email
{
    [TestClass]
    public class TemplateBuilderTests
    {
        [TestMethod]
        public async Task TestBuildMessageAsyncComment()
        {
            await RunContactUsTest(EmailType.Comment);
        }

        [TestMethod]
        public async Task TestBuildMessageAsyncInformation()
        {
            await RunContactUsTest(EmailType.Information);
        }

        [TestMethod]
        public async Task TestBuildMessageAsyncMembership()
        {
            await RunContactUsTest(EmailType.Membership);
        }

        [TestMethod]
        public async Task TestBuildMessageAsyncOther()
        {
            await RunContactUsTest(EmailType.Other);
        }

        [TestMethod]
        public async Task TestBuildMessageAsyncMembershipForm()
        {
            var model = new MembershipForm
            {
                EmailAddress = "test@example.com",
                MessageType = EmailType.MembershipForm,
                Name = "Testing",
                PhoneNumber = "07811111111",
                Breed = "Something",
                DogDateOfBirth = DateTime.Now,
                DogName = "Muttley",
                Message = "testing"
            };

            await RunTest(model);
        }

        private Task RunContactUsTest(EmailType emailType)
        {
            var model = new EmailMessage
            {
                EmailAddress = "test@example.com",
                MessageType = emailType,
                Name = "Testing",
                PhoneNumber = "07811111111",
                Text = "test"
            };

            return RunTest(model);
        }

        private async Task RunTest(EmailModel model)
        {
            var builder = new TemplateBuilder();

            var message = await builder.BuildMessageAsync(model.MessageType.ToString(), model);

            Assert.IsNotNull(message.TextContent);
            Assert.IsNotNull(message.HtmlContent);
        }
    }
}
