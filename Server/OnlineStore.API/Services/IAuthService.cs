using OnlineStore.API.DTOs;
using OnlineStore.API.Entities;

namespace OnlineStore.API.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(RegisterRequestDto request);

        Task<User?> ValidateUserAsync(string email, string password);
    }
}
