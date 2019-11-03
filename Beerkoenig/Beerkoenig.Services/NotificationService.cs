using Beerkoenig.Services.Configuration;
using Beerkoenig.Services.Interfaces;
using Beerkoenig.Services.Models;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using WebPush;

namespace Beerkoenig.Services
{
    public class NotificationService : INotificationService
    {
        private AppConfiguration configuration;

        public NotificationService(AppConfiguration configuration)
        {
            this.configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        public void SendMessage(IEnumerable<PushInfoModel> receivers, NotificationMessage message)
        {
            var webPushClient = new WebPushClient();
            var vapidDetails = new VapidDetails("mailto:brewmaster@beerkoenig.at",
                configuration.WebPushPublicKey, configuration.WebPushPrivateKey);

            var pushMessage = new WebPushMessage(message);

            foreach (var pushInfo in receivers)
            {
                webPushClient.SendNotification(new PushSubscription(pushInfo.SubscriptionEndpoint, pushInfo.p256dh, pushInfo.Auth),
                    JsonSerializer.Serialize(pushMessage), vapidDetails);
            }
        }
    }
}
