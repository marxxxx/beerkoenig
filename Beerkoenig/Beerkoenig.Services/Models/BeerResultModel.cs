using System;

namespace Beerkoenig.Services.Models
{
    public class BeerResultModel
    {
        public BeerResultModel()
        {
        }

        public BeerResultModel(int number, string beerId)
        {
            Number = number;
            BeerId = beerId ?? throw new ArgumentNullException(nameof(beerId));
        }

        public BeerResultModel(int number, string beerId, int vote)
        {
            this.Number = number;
            BeerId = beerId ?? throw new ArgumentNullException(nameof(beerId));
            Vote = vote;
        }

        public int Number { get; set; }
        public string BeerId { get; set; }
        public int Vote { get; set; }

        public override string ToString()
        {
            return $"{{{nameof(Number)}={Number}, {nameof(BeerId)}={BeerId}, {nameof(Vote)}={Vote}}}";
        }
    }
}