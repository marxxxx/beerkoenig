using Beerkoenig.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Beerkoenig.Services.Interfaces
{
    public interface IContestResultRepository
    {
        Task<List<ContestResultModel>> GetContestResultAsync(Guid contestId);
        Task<List<ParticipentResultModel>> GetResultForParticipentAsync(Guid contestId, string userName);
        Task SaveContestResultsAsync(Guid contestId, List<ParticipentResultModel> result);
    }
}
