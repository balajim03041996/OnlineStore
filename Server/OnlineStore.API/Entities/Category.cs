namespace OnlineStore.API.Entities
{
    public class Category
    {
        public int Id { get; set; }// primary key
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }

        public ICollection<Product> Products { get; set; } = new List<Product>();
    }
}
