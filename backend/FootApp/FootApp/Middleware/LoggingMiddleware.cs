using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;

public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Zaczynamy rejestrowanie
        var stopwatch = Stopwatch.StartNew();

        // Zapisujemy informacje o żądaniu
        _logger.LogInformation("Handling request: {method} {url}", context.Request.Method, context.Request.Path);

        // Wywołanie następnego middleware
        await _next(context);

        // Zatrzymujemy zegar
        stopwatch.Stop();

        // Zapisujemy informacje o odpowiedzi
        _logger.LogInformation("Finished handling request. Response Status Code: {statusCode}. Time taken: {time} ms",
            context.Response.StatusCode, stopwatch.ElapsedMilliseconds);
    }
}
