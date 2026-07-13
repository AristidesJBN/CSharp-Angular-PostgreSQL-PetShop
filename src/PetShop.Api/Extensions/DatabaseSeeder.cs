using Microsoft.EntityFrameworkCore;
using PetShop.Api.Data;
using PetShop.Api.Entities;

namespace PetShop.Api.Extensions;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(this IApplicationBuilder app)
    {
        using var scope = app.ApplicationServices.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        await db.Database.MigrateAsync();

        if (!await db.Usuarios.AnyAsync())
        {
            var (hash, salt) = Services.PasswordService.HashPassword("Admin@123");

            db.Usuarios.Add(new Usuario
            {
                Nome = "Administrador",
                Email = "admin@petshop.com",
                SenhaHash = hash,
                SenhaSalt = salt
            });

            await db.SaveChangesAsync();
        }
    }
}
