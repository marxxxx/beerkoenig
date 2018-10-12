using System;
using System.Collections.Generic;
using System.Text;

namespace Beerkoenig.Services.Models
{
    public class ContestResultModel
    {
        public ContestResultModel(string userName, int correctBeers)
        {
            UserName = userName ?? throw new ArgumentNullException(nameof(userName));
            CorrectBeers = correctBeers;
        }

        public string UserName { get; set; }
        public int CorrectBeers { get; set; }
    }
}
