using Beerkoenig.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Beerkoenig.Services.Interfaces
{
    public interface IContestRepository
    {
        Task CreateParticipentAsync(Guid contestId, CreateParticipentModel participent);
        Task SaveResultsAsync(Guid contestId, string userName, IEnumerable<BeerResultModel> results);
        Task<List<ParticipentModel>> GetParticipentsForContestAsync(Guid contestId);
    }
}
