using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Beerkoenig.Services.Interfaces;
using Beerkoenig.Services.Models;
using Microsoft.AspNetCore.Mvc;

namespace Beerkoenig.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public IAdminRepository AdminRepository { get; }
        public IAdminService AdminService { get; set; }

        public AdminController(IAdminRepository adminRepository, IAdminService adminService)
        {
            this.AdminRepository = adminRepository ?? throw new ArgumentNullException(nameof(adminRepository));
            this.AdminService = adminService ?? throw new ArgumentNullException(nameof(adminService));
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<BeerContestModel>> Get(Guid id)
        {
            var result = await this.AdminRepository.GetContestDefinitionAsync(id);
            return result;
        }

        
        [HttpPost]
        public async Task<ActionResult<Guid>> Post([FromBody] BeerContestModel contest)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            var contestId = await this.AdminRepository.CreateContestAsync(contest);
            return contestId;
        }

        
        [HttpPut("{id}/start")]
        public async Task<ActionResult> StartContest(Guid id)
        {
            await this.AdminRepository.StartContestAsync(id);
            return Ok();
        }

        
        [HttpPut("{id}/complete")]
        public async Task<ActionResult> CompleteContest(Guid id, [FromBody]List<BeerResultModel> result)
        {
            await this.AdminService.CompleteContestAsync(id, result);
            return Ok();
        }
    }
}
