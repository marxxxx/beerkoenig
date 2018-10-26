using Beerkoenig.Services.Interfaces;
using Beerkoenig.Services.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Beerkoenig.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public IAdminRepository AdminRepository { get; }
        public IAdminService AdminService { get; set; }
        public IHubContext<NotificationHub> HubContext { get; }

        public AdminController(IAdminRepository adminRepository, IAdminService adminService, IHubContext<NotificationHub> hubContext)
        {
            this.AdminRepository = adminRepository ?? throw new ArgumentNullException(nameof(adminRepository));
            this.AdminService = adminService ?? throw new ArgumentNullException(nameof(adminService));
            this.HubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
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
            if (!ModelState.IsValid)
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
            await this.HubContext.Clients.All.SendAsync("contestFinished", id.ToString());
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<string>> UploadBeerImage(IFormFile file)
        {
            using (var strm = file.OpenReadStream())
            {
                string fileUri = await this.AdminRepository.UploadBeerImageAsync(Path.GetExtension(file.FileName), strm);
                return fileUri;
            }
        }
    }
}
