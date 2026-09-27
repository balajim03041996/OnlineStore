using Microsoft.AspNetCore.Mvc;

namespace OnlineStore.API.Controllers;

// [ApiController] gives: automatic 400 on invalid models, binding source inference, etc.
// [Route] "api/[controller]" -> "api/health" (class name minus "Controller")
[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    // GET api/health – simple check that the API is running
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { status = "Healthy", time = DateTime.UtcNow });
    }
    [HttpGet("error")]
    public IActionResult ThrowError()
    {
        throw new Exception("Test exception from HealthController");
    }

}