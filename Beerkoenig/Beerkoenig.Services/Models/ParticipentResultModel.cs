using System;
using System.Collections.Generic;
using System.Text;

namespace Beerkoenig.Services.Models
{
    public class ParticipentResultModel
    {
        public ParticipentResultModel(string userName, int beerNumber, string beerId, bool isCorrect)
        {
            BeerNumber = beerNumber;
            UserName = userName ?? throw new ArgumentNullException(nameof(userName));
            BeerId = beerId ?? throw new ArgumentNullException(nameof(beerId));
            IsCorrect = isCorrect;
        }

        public int BeerNumber { get; set; }

        public string UserName { get; set; }

        public string BeerId { get; set; }

        public bool IsCorrect { get; set; }

        public override string ToString()
        {
            return $"{{{nameof(BeerNumber)}={BeerNumber}, {nameof(UserName)}={UserName}, {nameof(BeerId)}={BeerId}, {nameof(IsCorrect)}={IsCorrect}}}";
        }
    }
}
