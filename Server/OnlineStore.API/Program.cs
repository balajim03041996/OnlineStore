using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

// ============================================================
// PART 1: BUILDER – register services in the DI container
// "Services" = classes the app needs (controllers, DbContext,
// our own services). The DI container creates and injects them.
// ============================================================
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();   // enables [ApiController] classes
builder.Services.AddOpenApi();       // generates the OpenAPI (Swagger) JSON document
builder.Services.AddDbContext<OnlineStore.API.Data.AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("defaultConnection")));
// (Step 2) builder.Services.AddDbContext<AppDbContext>(...)
// (Step 3) builder.Services.AddScoped<IProductService, ProductService>();
// (Step 5) builder.Services.AddCors(...)
// (Step 9) builder.Services.AddAuthentication(...)

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

// (Step 4) app.UseMiddleware<ExceptionMiddleware>();  // first, so it catches everything
app.UseHttpsRedirection();
// (Step 5) app.UseCors(...);
// (Step 9) app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();              // route requests to controller actions

app.Run();
