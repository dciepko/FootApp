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

    [HttpPost]
    public async Task<IActionResult> GetFootballData([FromBody] string endpoint)
    {
        Console.WriteLine(endpoint);
        var data = await _footballApiService.GetFootballDataAsync(endpoint);
        return Ok(data);
    }
}
