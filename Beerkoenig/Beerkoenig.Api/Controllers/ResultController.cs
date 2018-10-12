using Beerkoenig.Services.Interfaces;
using Beerkoenig.Services.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Beerkoenig.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResultController : ControllerBase
    {
        public IContestResultRepository ContestResultRepository { get; set; }

        public ResultController(IContestResultRepository contestResultRepository)
        {
            ContestResultRepository = contestResultRepository ?? throw new ArgumentNullException(nameof(contestResultRepository));
        }

        [HttpGet("{contestId}/contest")]
        public async Task<List<ContestResultModel>> GetContestResults(Guid contestId)
        {
            var result = await ContestResultRepository.GetContestResultAsync(contestId);
            return result;
        }

        [HttpGet("{contestId}/participent/{userName}")]
        public async Task<List<ParticipentResultModel>> GetParticipentResults(Guid contestId, string userName)
        {
            var result = await ContestResultRepository.GetResultForParticipentAsync(contestId, userName);
            return result;
        }
    }
}
