using System.ComponentModel.DataAnnotations;

namespace OnlineStore.API.DTOs
{
    public class RegisterRequestDto : IValidatableObject
    {
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(8)]
        public string Password { get; set; } = string.Empty;

        [Required]
        public DateOnly? DateOfBirth { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var cutoff = DateOnly.FromDateTime(DateTime.UtcNow).AddYears(-18);
            if (DateOfBirth > cutoff)
                yield return new ValidationResult("You must be at least 18", new[] { nameof(DateOfBirth) });
        }

    }
}
