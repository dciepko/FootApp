using DbUp;
using System.IO;

namespace FootApp.Helpers
{
    class RunMigrationsHelper
    {
        public static void RunMigrations(string connectionString)
        {
            var upgrader = DeployChanges.To
                .SqlDatabase(connectionString)
                .WithScriptsFromFileSystem(Path.Combine(Directory.GetCurrentDirectory(), "Migrations")) // Zmiana na Directory.GetCurrentDirectory()
                .LogToConsole()
                .Build();

            var result = upgrader.PerformUpgrade();

            if (!result.Successful)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Migration error: {result.Error}");
                Console.ResetColor();
                throw new Exception("Database migration failed.");
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Database migration successful!");
            Console.ResetColor();
        }
    }
}
