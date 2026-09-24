namespace OnlineStore.API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public int CategoryId { get; set; }// foriegn key
        public Category Category { get; set; } = null!;// navigation property ponting back to category
        public double Price { get; set; }
        public int StockQuantity { get; set;}
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
