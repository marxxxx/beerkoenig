using Beerkoenig.Services.Models;
using System.Collections.Generic;

namespace Beerkoenig.Services.Interfaces
{
    public interface INotificationService
    {
        void SendMessage(IEnumerable<PushInfoModel> receivers, NotificationMessage message);
    }
}