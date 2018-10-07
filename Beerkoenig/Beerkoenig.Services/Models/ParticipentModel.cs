using System;
using System.Collections.Generic;
using System.Text;

namespace Beerkoenig.Services.Models
{
    public class ParticipentModel
    {
        public ParticipentModel()
        {
        }

        public ParticipentModel(Guid contestId, string userName)
        {
            ContestId = contestId;
            UserName = userName ?? throw new ArgumentNullException(nameof(userName));
        }

        public Guid ContestId { get; set; }
        public string UserName { get; set; }
        public List<BeerResultModel> Results { get; set; }

        public override string ToString()
        {
            return $"{{{nameof(ContestId)}={ContestId}, {nameof(UserName)}={UserName}, {nameof(Results)}={Results}}}";
        }
    }
}
