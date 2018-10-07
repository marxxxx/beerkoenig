using Beerkoenig.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Beerkoenig.Services.Interfaces
{
    public interface IContestService
    {
        Task SaveResultsAsync(Guid contestId, string userName, IEnumerable<BeerResultModel> results);
    }
}
