using System;
using System.Collections.Generic;
using System.Text;

namespace Beerkoenig.Services.Configuration
{
    public class AppConfiguration
    {
        public string StorageConnectionString { get; set; }
        public string WebPushPublicKey { get; set; }
        public string WebPushPrivateKey { get; set; }
        public string SignalRConnectionString { get; set; }

        public AppConfiguration(string storageConnectionString, 
            string webPushPublicKey, string webPushPrivateKey,
            string signalRConnectionString)
        {
            this.StorageConnectionString = storageConnectionString ?? throw new ArgumentNullException(nameof(storageConnectionString));
            this.WebPushPublicKey = webPushPublicKey;
            this.WebPushPrivateKey = webPushPrivateKey;
            this.SignalRConnectionString = signalRConnectionString;
        }

        public AppConfiguration()
        {
        }

        public override string ToString()
        {
            return $"{{{nameof(StorageConnectionString)}={StorageConnectionString}, {nameof(WebPushPublicKey)}={WebPushPublicKey}, {nameof(WebPushPrivateKey)}={WebPushPrivateKey}, {nameof(SignalRConnectionString)}={SignalRConnectionString}}}";
        }
    }
}
