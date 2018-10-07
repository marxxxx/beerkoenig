using Beerkoenig.Services.Interfaces;
using Beerkoenig.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beerkoenig.Services
{
    public class ContestService : IContestService
    {
        public IAdminRepository AdminRepository { get; }
        public IContestRepository ContestRepository { get; }


        public ContestService(IAdminRepository adminRepository, IContestRepository contestRepository)
        {
            this.AdminRepository = adminRepository ?? throw new ArgumentNullException(nameof(adminRepository));
            this.ContestRepository = contestRepository ?? throw new ArgumentNullException(nameof(contestRepository));
        }

        public async Task SaveResultsAsync(Guid contestId, string userName, IEnumerable<BeerResultModel> results)
        {
            var contest = await this.AdminRepository.GetContestDefinitionAsync(contestId);
            if(contest.State != BeerContestState.InProgress)
            {
                throw new InvalidOperationException($"Beer Contest {contestId} is in state {contest.State}. Saving results not possible.");
            }

            var contestBeerIds = contest.Beers.Select(b => b.Id).ToList();

            if(!results.All( r => contestBeerIds.Contains(r.BeerId)))
            {
                throw new ArgumentException("Beer results contain invalid beer id!");
            }

            await this.ContestRepository.SaveResultsAsync(contestId, userName, results);
        }
    }
}
