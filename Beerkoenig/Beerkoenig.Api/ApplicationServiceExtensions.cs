using Beerkoenig.Services;
using Beerkoenig.Services.Configuration;
using Beerkoenig.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Beerkoenig.Api
{
    public static class ApplicationServiceExtensions
    {
        public static void AddBeerkoenig(this IServiceCollection services, IConfiguration configuration)
        {
            var section = configuration.GetSection("AppConfiguration");
            var config = section.Get<AppConfiguration>();

            services.AddSingleton(config);
            services.AddScoped<StorageAccessService>();
            services.AddScoped<IAdminRepository, AdminRepository>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IContestRepository, ContestRepository>();
            services.AddScoped<IContestResultRepository, ContestResultRepository>();
        }
    }
}
