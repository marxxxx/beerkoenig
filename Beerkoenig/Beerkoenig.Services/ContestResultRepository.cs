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
    public class ContestResultRepository : IContestResultRepository
    {
        private const string TableName = "result";

        public StorageAccessService StorageAccessService { get; }

        public ContestResultRepository(StorageAccessService storageAccessService)
        {
            this.StorageAccessService = storageAccessService ?? throw new ArgumentNullException(nameof(storageAccessService));
        }


        public async Task<List<ParticipentResultModel>> GetResultForParticipentAsync(Guid contestId, string userName)
        {
            var contestResult = await GetAllParticipentResultsAsync(contestId);
            return contestResult.Where(c => c.UserName == userName).ToList();
        }


        public Task SaveContestResultsAsync(Guid contestId, List<ParticipentResultModel> result)
        {
            var entities = result.Select(r => new ParticipentResultEntity(contestId.ToString(), r.UserName, r.BeerNumber, r.BeerId, r.IsCorrect));
            var table = StorageAccessService.GetTableReference(TableName);
            var operation = new TableBatchOperation();
            foreach(var e in entities)
            {
                operation.Add(TableOperation.Insert(e));
            }

            return table.ExecuteBatchAsync(operation);
        }

        public async Task<List<ContestResultModel>> GetContestResultAsync(Guid contestId)
        {
            var result = await GetAllParticipentResultsAsync(contestId);
            var contestResults = result.GroupBy(g => g.UserName)
                .Select(g => new ContestResultModel(g.Key, g.Count(r => r.IsCorrect)))
                .ToList();
            return contestResults;
        }

        private async Task<List<ParticipentResultModel>> GetAllParticipentResultsAsync(Guid contestId)
        {
            string whereClause = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, contestId.ToString());
            var queryResult = await StorageAccessService.QueryTableAsync<ParticipentResultEntity>(TableName, whereClause);
            var result = queryResult.Select(r => new ParticipentResultModel(r.UserName, r.BeerNumber, r.BeerId, r.IsCorrect)).ToList();
            return result;
        }

    }
}
