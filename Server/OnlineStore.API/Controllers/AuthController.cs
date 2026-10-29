using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using OnlineStore.API.DTOs;
using OnlineStore.API.Services;
using System.Security.Claims;
using System.Text;

namespace OnlineStore.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _config;
        public AuthController(IConfiguration config, IAuthService authService)
        {
            _config = config;
            _authService = authService;
        }
        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var user = await _authService.ValidateUserAsync(request.Email, request.Password);
            if (user == null)
                return Unauthorized("Invalid email or password");

            var expires = DateTime.UtcNow.AddMinutes(_config.GetValue<int>("Jwt:ExpiryMinutes"));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),// user id, read later for "my orders"
                    new Claim(ClaimTypes.Name, user.FullName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)// role from DB, not hard-coded
                }),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                Expires = expires,
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            };

            string token = new JsonWebTokenHandler().CreateToken(tokenDescriptor);
            return Ok(new { token, expiresAt = expires });
        }

        // POST api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto request)
        {
            bool status = await _authService.RegisterAsync(request);
            if (status)
                return StatusCode(StatusCodes.Status201Created);
            else
                return Conflict("Email already registered");
        }
    }
}
