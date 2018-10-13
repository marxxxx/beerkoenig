using System;
using System.Collections.Generic;
using System.Text;

namespace Beerkoenig.Services.Models
{
    public class CreateParticipentModel
    {
        public string UserName { get; set; }
        public PushInfoModel PushInfo { get; set; }
    }
}
