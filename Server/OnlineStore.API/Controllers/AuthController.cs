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
        public IActionResult Login(LoginRequestDto request)
        {
            if (request.Username != _config["Admin:Username"] || request.Password != _config["Admin:Password"])
            {
                return Unauthorized("Invalid username or password");
            }

            var expires = DateTime.UtcNow.AddMinutes(_config.GetValue<int>("Jwt:ExpiryMinutes"));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, request.Username),
                    new Claim(ClaimTypes.Role, "Admin")
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
