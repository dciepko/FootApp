using StackExchange.Redis;
using System.Net.Http;
using System.Threading.Tasks;
using System.Text.Json;

public class FootballApiService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly HttpClient _httpClient;

    public FootballApiService(IConnectionMultiplexer redis, HttpClient httpClient)
    {
        _redis = redis;
        _httpClient = httpClient;

        // Dodaj klucz API-Football w nagłówku
        _httpClient.DefaultRequestHeaders.Add("x-apisports-key", "YOUR_API_KEY");
    }

    public async Task<string> GetFootballDataAsync(string endpoint)
    {
        var db = _redis.GetDatabase();
        var cacheKey = $"football_data:{endpoint}";

        // 1. Sprawdź, czy dane są już w Redis
        var cachedData = await db.StringGetAsync(cacheKey);
        if (!cachedData.IsNullOrEmpty)
        {
            return cachedData;
        }

        // 2. Jeśli nie, pobierz dane z API-Football
        var response = await _httpClient.GetStringAsync($"https://v3.football.api-sports.io/{endpoint}");

        // 3. Zapisz dane w Redis z czasem życia 10 minut
        await db.StringSetAsync(cacheKey, response, TimeSpan.FromMinutes(10));

        return response;
    }
}
