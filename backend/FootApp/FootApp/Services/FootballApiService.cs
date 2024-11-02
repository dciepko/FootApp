using StackExchange.Redis;

public class FootballApiService
{
/*    private readonly IConnectionMultiplexer _redis;
*/    private readonly HttpClient _httpClient;

    public FootballApiService(/*IConnectionMultiplexer redis,*/ HttpClient httpClient)
    {
/*        _redis = redis;
*/        _httpClient = httpClient;

        // Dodaj wymagane nagłówki
        _httpClient.DefaultRequestHeaders.Add("x-apisports-key", "1dbba86a73423a8de3681073c6828d47");
        _httpClient.DefaultRequestHeaders.Add("x-rapidapi-host", "v3.football.api-sports.io");  // Dodano hosta
    }

    public async Task<string> GetFootballDataAsync(string endpoint)
    {
        /* var db = _redis.GetDatabase();
         var cacheKey = $"football_data:{endpoint}";

         // Próba pobrania danych z cache
         var cachedData = await db.StringGetAsync(cacheKey);
         if (!cachedData.IsNullOrEmpty)
         {
             return cachedData;
         }*/

        // Pobranie danych z API, jeśli nie ma ich w cache
        Console.WriteLine(endpoint);
        try
        {
            var response = await _httpClient.GetStringAsync($"https://v3.football.api-sports.io/{endpoint}");
/*            await db.StringSetAsync(cacheKey, response, TimeSpan.FromMinutes(10)); // Cache na 10 minut
*/            return response;
        }
        catch (HttpRequestException ex)
        {
            // Obsługa błędów (np. logowanie lub zwrócenie wartości domyślnej)
            throw new Exception("Błąd podczas pobierania danych z API-Football", ex);
        }
    }
}
