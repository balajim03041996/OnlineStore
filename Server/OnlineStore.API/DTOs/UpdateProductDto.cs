using System.ComponentModel.DataAnnotations;

namespace OnlineStore.API.DTOs
{
    public class UpdateProductDto
    {
        [Required]
        [MaxLength(150)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "CategoryId must be a valid category.")]
        public int CategoryId { get; set; }

        [Range(0.01, 1000000, ErrorMessage = "Price must be greater than 0.")]
        public decimal Price { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "Stock must be a non-negative integer.")]
        public int StockQuantity { get; set; }

        [MaxLength(500)]
        [Url]
        public string? ImageUrl { get; set; }
    }
}
