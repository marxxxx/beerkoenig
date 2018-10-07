using Beerkoenig.Services.Entitys;
using Beerkoenig.Services.Interfaces;
using Beerkoenig.Services.Models;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Beerkoenig.Services
{
    public class AdminRepository : IAdminRepository
    {
        private const string TableName = "admin";

        public StorageAccessService StorageAccessService { get; }

        public AdminRepository(StorageAccessService storageAccessService)
        {
            this.StorageAccessService = storageAccessService ?? throw new ArgumentNullException(nameof(storageAccessService));
        }


        public async Task CompleteContest(Guid contestId, IEnumerable<BeerResultModel> results)
        {
            var entity = await StorageAccessService.GetTableEntityAsync<JsonTableEntity<BeerContestModel>>(TableName, contestId.ToString(), contestId.ToString());
            if (results == null || results.Count() < entity.Entity.BeerCount)
            {
                throw new ArgumentException($"Invalid beer results!");
            }
            entity.Entity.State = BeerContestState.Completed;
            entity.Entity.Results = results.ToList(); //TODO: Calculate votes per based on participent results

            var table = StorageAccessService.GetTableReference(TableName);
            TableOperation operation = TableOperation.Replace(entity);
            await table.ExecuteAsync(operation);
        }

        public async Task<Guid> CreateContestAsync(BeerContestModel contest)
        {
            Guid contestId = Guid.NewGuid();
            contest.Id = contestId;
            var entity = new JsonTableEntity<BeerContestModel>(contestId.ToString(), contestId.ToString(), contest);
            var table = StorageAccessService.GetTableReference(TableName);

            TableOperation operation = TableOperation.Insert(entity);
            await table.ExecuteAsync(operation);

            return contestId;
        }

        public async Task<BeerContestModel> GetContestDefinitionAsync(Guid contestId)
        {
            var entity = await StorageAccessService.GetTableEntityAsync<JsonTableEntity<BeerContestModel>>(TableName, contestId.ToString(), contestId.ToString());
            return entity.Entity;
        }

        public async Task StartContestAsync(Guid contestId)
        {
            var entity = await StorageAccessService.GetTableEntityAsync<JsonTableEntity<BeerContestModel>>(TableName, contestId.ToString(), contestId.ToString());
            entity.Entity.State = BeerContestState.InProgress;

            var table = StorageAccessService.GetTableReference(TableName);
            TableOperation operation = TableOperation.Replace(entity);
            await table.ExecuteAsync(operation);
        }
    }
}
