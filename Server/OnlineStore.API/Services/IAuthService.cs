using OnlineStore.API.DTOs;

namespace OnlineStore.API.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(RegisterRequestDto request);
    }
}
