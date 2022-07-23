using System;
using API.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            // Here we get access to our scope so that we can use it to set up our context and logger
            using var scope = host.Services.CreateScope();
            // Scope (taken from host), gives us access to create (maybe inject?) services at runtime
            // Note that we are referencing existing classes, not just interfaces
            var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
            // ILogger interface needs a type to tell it what it is logging inside of
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {
                // Migrate will run any migrations that have not been run yet, and will also create the database if it does not exist
                context.Database.Migrate();
                // Initialize will seed the database once it exists
                // We pass context into the Initialize method to give the method access to our database context
                DbInitializer.Initialize(context);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Problem migrating data");
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
