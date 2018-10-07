using Beerkoenig.Services.Entitys;
using Beerkoenig.Services.Interfaces;
using Beerkoenig.Services.Models;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Beerkoenig.Services
{
    public class ContestRepository : IContestRepository
    {
        private const string TableName = "contest";

        public StorageAccessService StorageAccessService { get; }

        public ContestRepository(StorageAccessService storageAccessService)
        {
            this.StorageAccessService = storageAccessService ?? throw new ArgumentNullException(nameof(storageAccessService));
        }
                

        public Task CreateParticipentAsync(Guid contestId, string userName)
        {
            var participentEntity = new JsonTableEntity<ParticipentModel>(contestId.ToString(), userName, new ParticipentModel(contestId, userName));
            var table = this.StorageAccessService.GetTableReference(TableName);

            var operation = TableOperation.Insert(participentEntity);
            return table.ExecuteAsync(operation);            
        }

        public async Task SaveResultsAsync(Guid contestId, string userName, IEnumerable<BeerResultModel> results)
        {
            if(userName == null || results == null)
            {
                throw new ArgumentException("Invalid arguments for saving results!");
            }
            var participentEntity = await this.StorageAccessService.GetTableEntityAsync<JsonTableEntity<ParticipentModel>>(TableName, contestId.ToString(), userName);
            participentEntity.Entity.Results = results.ToList();

            var operation = TableOperation.Replace(participentEntity);
            var table = this.StorageAccessService.GetTableReference(TableName);
            await table.ExecuteAsync(operation);
        }
    }
}
