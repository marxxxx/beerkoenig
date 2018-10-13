using System;
using System.Collections.Generic;
using System.Text;

namespace Beerkoenig.Services.Models
{
    public class PushInfoModel
    {
        public string SubscriptionEndpoint { get; set; }
        public string Auth { get; set; }
        public string p256dh { get; set; }
    }
}
