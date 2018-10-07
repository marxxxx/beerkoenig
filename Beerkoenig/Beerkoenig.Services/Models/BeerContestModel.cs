using System;
using System.Collections.Generic;
using System.Text;

namespace Beerkoenig.Services.Models
{
    public class BeerContestModel
    {
        public BeerContestModel()
        {
        }

        public BeerContestModel(Guid id, BeerContestState state, DateTime timestamp, string creatorUserName, string title, int beerCount, List<BeerDefinitionModel> beers)
        {
            Id = id;
            State = state;
            Timestamp = timestamp;
            CreatorUserName = creatorUserName ?? throw new ArgumentNullException(nameof(creatorUserName));
            Title = title ?? throw new ArgumentNullException(nameof(title));
            BeerCount = beerCount;
            Beers = beers ?? throw new ArgumentNullException(nameof(beers));
        }

        public Guid Id { get; set; }
        public BeerContestState State { get; set; }
        public DateTime Timestamp { get; set; }
        public string CreatorUserName { get; set; }
        public string Title { get; set; }
        public int BeerCount { get; set; }
        public List<BeerDefinitionModel> Beers { get; set; }
        public List<BeerResultModel> Results { get; set; }

        public override string ToString()
        {
            return $"{{{nameof(Id)}={Id}, {nameof(State)}={State}, {nameof(Timestamp)}={Timestamp}, {nameof(CreatorUserName)}={CreatorUserName}, {nameof(Title)}={Title}, {nameof(BeerCount)}={BeerCount}}}";
        }
    }
}
