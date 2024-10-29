using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class APIFootballController : ControllerBase
{
    private readonly FootballApiService _footballApiService;

    public APIFootballController(FootballApiService footballApiService)
    {
        _footballApiService = footballApiService;
    }

    [HttpGet("{*endpoint}")]
    public async Task<IActionResult> GetFootballData(string endpoint)
    {
        // Przekaż endpoint do FootballApiService, który zajmie się cache’owaniem i pobieraniem
        var data = await _footballApiService.GetFootballDataAsync(endpoint);
        return Ok(data);
    }
}
