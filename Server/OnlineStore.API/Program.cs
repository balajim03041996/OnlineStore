using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using OnlineStore.API.Services;
using OnlineStore.API.Middleware;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

// ============================================================
// PART 1: BUILDER – register services in the DI container
// "Services" = classes the app needs (controllers, DbContext,
// our own services). The DI container creates and injects them.
// ============================================================
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();   // enables [ApiController] classes
builder.Services.AddOpenApi();       // generates the OpenAPI (Swagger) JSON document
builder.Services.AddDbContext<OnlineStore.API.Data.AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("defaultConnection"),
    sql=> sql.EnableRetryOnFailure()));
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactAPP", policy =>
{
    policy.WithOrigins("http://localhost:5173", "https://salmon-dune-049de6200.1.azurestaticapps.net")   // // React dev + React on Azure.
              .AllowAnyHeader()
              .AllowAnyMethod();

});
});
// JWT authentication: check every incoming token's issuer, audience, expiry and signature
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("Jwt:Key is missing (user-secrets / Key Vault)");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.FromMinutes(1)
        };
    });
builder.Services.AddAuthorization();

var app = builder.Build();

// ============================================================
// PART 2: MIDDLEWARE PIPELINE – every HTTP request passes
// through these in ORDER, and the response flows back in reverse.
// Order matters! (e.g. Authentication must come before Authorization)
// ============================================================

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();              // /openapi/v1.json
    app.MapScalarApiReference();   // /scalar  -> browser UI to test the API
}

app.UseMiddleware<ExceptionMiddleware>();  // first, so it catches everything
app.UseHttpsRedirection();
app.UseCors("AllowReactAPP");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();              // route requests to controller actions

app.Run();
