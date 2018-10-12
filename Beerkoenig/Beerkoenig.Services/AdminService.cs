using Beerkoenig.Services.Entitys;
using Beerkoenig.Services.Interfaces;
using Beerkoenig.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beerkoenig.Services
{
    public class AdminService : IAdminService
    {
        public StorageAccessService StorageAccessService { get; set; }
        public IContestResultRepository ContestResultRepository { get; set; }
        public IAdminRepository AdminRepository { get; set; }
        public IContestRepository ContestRepository { get; set; }

        public AdminService(StorageAccessService storageAccessService, IContestResultRepository contestResultRepository, IAdminRepository adminRepository,
            IContestRepository contestRepository)
        {
            StorageAccessService = storageAccessService ?? throw new ArgumentNullException(nameof(storageAccessService));
            ContestResultRepository = contestResultRepository ?? throw new ArgumentNullException(nameof(contestResultRepository));
            AdminRepository = adminRepository ?? throw new ArgumentNullException(nameof(adminRepository));
            ContestRepository = contestRepository ?? throw new ArgumentNullException(nameof(contestRepository));
        }

        public async Task CompleteContestAsync(Guid contestId, IEnumerable<BeerResultModel> results)
        {
            var contestEntity = await AdminRepository.GetContestDefinitionEntityAsync(contestId);
            if (results == null || results.Count() < contestEntity.Entity.BeerCount)
            {
                throw new ArgumentException($"Invalid beer results!");
            }

            // sum up votes per participent
            var participents = await ContestRepository.GetParticipentsForContestAsync(contestId);
            foreach (var r in results)
            {
                r.Vote = participents.SelectMany(p => p.Results).Where(p => p.BeerId == r.BeerId).Sum(b => b.Vote);
            }

            contestEntity.Entity.State = BeerContestState.Completed;
            contestEntity.Entity.Results = results.ToList();

            await AdminRepository.UpdateContestEntityAsync(contestEntity);

            // calculate results per participent
            List<ParticipentResultModel> contestResults = new List<ParticipentResultModel>();
            foreach (var p in participents)
            {
                foreach(var r in p.Results)
                {
                    var resultItem = new ParticipentResultModel(p.UserName, r.Number, r.BeerId, results.Any(res => res.BeerId == r.BeerId && res.Number == r.Number));
                    contestResults.Add(resultItem);
                }
            }

            await ContestResultRepository.SaveContestResultsAsync(contestId, contestResults);
        }
    }
}
