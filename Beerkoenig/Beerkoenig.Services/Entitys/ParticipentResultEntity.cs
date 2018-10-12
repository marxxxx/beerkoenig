using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Text;

namespace Beerkoenig.Services.Entitys
{
    public class ParticipentResultEntity : TableEntity
    {
        public ParticipentResultEntity()
        {
        }

        public ParticipentResultEntity(string contestId, string userName, int beerNumber, string beerId, bool isCorrect)
            :base(contestId, $"{userName}|{beerId}")
        {
            ContestId = contestId ?? throw new ArgumentNullException(nameof(contestId));
            UserName = userName ?? throw new ArgumentNullException(nameof(userName));
            BeerNumber = beerNumber;
            BeerId = beerId ?? throw new ArgumentNullException(nameof(beerId));
            IsCorrect = isCorrect;
        }

        public int BeerNumber { get; set; }

        public string ContestId { get; set; }

        public string UserName { get; set; }

        public string BeerId { get; set; }

        public bool IsCorrect { get; set; }

        
    }
}
