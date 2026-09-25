using OnlineStore.API.Entities;

namespace OnlineStore.API.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int CategoryId { get; set; }// foriegn key
        public string CategoryName { get; set; } = string.Empty;  // flattened from Category
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public string? ImageUrl { get; set; }
    }
}
