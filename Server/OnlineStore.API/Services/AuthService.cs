using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OnlineStore.API.Data;
using OnlineStore.API.DTOs;
using OnlineStore.API.Entities;

namespace OnlineStore.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _dbContext;

        public AuthService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> RegisterAsync(RegisterRequestDto request)
        {
            User user = new User();
            user.FullName = request.FullName.Trim();
            user.Email = request.Email.Trim().ToLower();
            bool isAlreadyExistMail = await _dbContext.Users.AnyAsync(x => x.Email == user.Email);
            if (isAlreadyExistMail)
                return false;

            var hasher = new PasswordHasher<User>();
            user.PasswordHash = hasher.HashPassword(user, request.Password);
            _dbContext.Add(user);

            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<User?> ValidateUserAsync(string email, string password)
        {
            string emailTrimed = email.Trim().ToLower();
            var user =await _dbContext.Users.AsNoTracking().FirstOrDefaultAsync(x => x.Email == emailTrimed);
            if (user == null)
                return null;
            var result = new PasswordHasher<User>().VerifyHashedPassword(user,user.PasswordHash, password);
            if (result == PasswordVerificationResult.Failed)
                return null;
            return user;
        }
    }
}
