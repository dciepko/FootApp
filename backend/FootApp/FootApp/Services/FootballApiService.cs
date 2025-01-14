using StackExchange.Redis;

public class FootballApiService
{
    private readonly IConnectionMultiplexer _redis;
    private readonly HttpClient _httpClient;

    public FootballApiService(IConnectionMultiplexer redis, HttpClient httpClient)
    {
        _redis = redis;
        _httpClient = httpClient;

        _httpClient.DefaultRequestHeaders.Add("x-apisports-key", "1dbba86a73423a8de3681073c6828d47");
    }

    public async Task<string> GetFootballDataAsync(string endpoint)
    {
        var db = _redis.GetDatabase();
        var cacheKey = $"football_data:{endpoint}";

        var cachedData = await db.StringGetAsync(cacheKey);
        if (!cachedData.IsNullOrEmpty)
        {
            Console.WriteLine($"[CACHE] Cache hit for key: {cacheKey}");
            return cachedData;
        }

        Console.WriteLine($"[CACHE] Cache miss for key: {cacheKey}. Fetching from API.");
        try
        {
            var response = await _httpClient.GetStringAsync($"https://v3.football.api-sports.io/{endpoint}");

            await db.StringSetAsync(cacheKey, response, TimeSpan.FromMinutes(10)); 
            Console.WriteLine($"[CACHE] Data cached with key: {cacheKey} for 10 minutes.");
            return response;
        }
        catch (HttpRequestException ex)
        {
            throw new Exception("Błąd podczas pobierania danych z API-Football", ex);
        }
    }
}
