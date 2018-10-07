using Beerkoenig.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Beerkoenig.Services.Interfaces
{
    public interface IAdminRepository
    {
        Task<Guid> CreateContestAsync(BeerContestModel contest);
        Task<BeerContestModel> GetContestDefinitionAsync(Guid contestId);
        Task StartContestAsync(Guid contestId);
        Task CompleteContest(Guid contestId, IEnumerable<BeerResultModel> results);
    }
}
