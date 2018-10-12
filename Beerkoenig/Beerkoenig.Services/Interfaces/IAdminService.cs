using Beerkoenig.Services.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Beerkoenig.Services.Interfaces
{
    public interface IAdminService
    {
        Task CompleteContestAsync(Guid contestId, IEnumerable<BeerResultModel> results);
    }
}
