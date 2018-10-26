using Beerkoenig.Services.Entitys;
using Beerkoenig.Services.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Beerkoenig.Services.Interfaces
{
    public interface IAdminRepository
    {
        Task<Guid> CreateContestAsync(BeerContestModel contest);
        Task<BeerContestModel> GetContestDefinitionAsync(Guid contestId);
        Task StartContestAsync(Guid contestId);
        Task<JsonTableEntity<BeerContestModel>> GetContestDefinitionEntityAsync(Guid contestId);
        Task UpdateContestEntityAsync(JsonTableEntity<BeerContestModel> entity);
        Task<string> UploadBeerImageAsync(string extension, Stream imageStream);
    }
}
