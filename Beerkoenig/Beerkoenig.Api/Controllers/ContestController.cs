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
    public class ContestController : ControllerBase
    {
        public IContestRepository ContestRepository { get; }

        public ContestController(IContestRepository contestRepository)
        {
            this.ContestRepository = contestRepository ?? throw new ArgumentNullException(nameof(contestRepository));
        }

        [HttpPost("{contestId}")]
        public async Task<ActionResult> CreateParticipent(Guid contestId, [FromBody]CreateParticipentModel participent)
        {
            await this.ContestRepository.CreateParticipentAsync(contestId, participent);
            return Ok();
        }

        [HttpPut("{contestId}/{userName}")]
        public async Task<ActionResult> SaveResults(Guid contestId, string userName, [FromBody]IEnumerable<BeerResultModel> results)
        {
            await this.ContestRepository.SaveResultsAsync(contestId, userName, results);
            return Ok();
        }
        

    }
}
