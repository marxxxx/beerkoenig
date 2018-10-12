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
        public IContestRepository ContestRepository { get; }

        public AdminRepository(StorageAccessService storageAccessService, IContestRepository contestRepository)
        {
            this.StorageAccessService = storageAccessService ?? throw new ArgumentNullException(nameof(storageAccessService));
            this.ContestRepository = contestRepository ?? throw new ArgumentNullException(nameof(contestRepository));
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
            var entity = await GetContestDefinitionEntityAsync(contestId);
            return entity.Entity;
        }

        public async Task<JsonTableEntity<BeerContestModel>> GetContestDefinitionEntityAsync(Guid contestId)
        {
            var entity = await StorageAccessService.GetTableEntityAsync<JsonTableEntity<BeerContestModel>>(TableName, contestId.ToString(), contestId.ToString());
            return entity;
        }

        public async Task StartContestAsync(Guid contestId)
        {
            var entity = await StorageAccessService.GetTableEntityAsync<JsonTableEntity<BeerContestModel>>(TableName, contestId.ToString(), contestId.ToString());
            entity.Entity.State = BeerContestState.InProgress;

            var table = StorageAccessService.GetTableReference(TableName);
            TableOperation operation = TableOperation.Replace(entity);
            await table.ExecuteAsync(operation);
        }

        public async Task UpdateContestEntityAsync(JsonTableEntity<BeerContestModel> entity)
        {
            var table = StorageAccessService.GetTableReference(TableName);
            TableOperation operation = TableOperation.Replace(entity);
            await table.ExecuteAsync(operation);
        }
    }
}
