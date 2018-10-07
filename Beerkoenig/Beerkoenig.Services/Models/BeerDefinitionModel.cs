using System;

namespace Beerkoenig.Services.Models
{
    public class BeerDefinitionModel
    {
        public BeerDefinitionModel()
        {
        }

        public BeerDefinitionModel(string id, string description, string imageUrl)
        {
            Id = id ?? throw new ArgumentNullException(nameof(id));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            ImageUrl = imageUrl;
        }

        public string Id { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }

        public override string ToString()
        {
            return $"{{{nameof(Id)}={Id}, {nameof(Description)}={Description}, {nameof(ImageUrl)}={ImageUrl}}}";
        }
    }
}