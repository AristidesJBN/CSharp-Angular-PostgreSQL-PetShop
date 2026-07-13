using Microsoft.EntityFrameworkCore;
using PetShop.Api.Entities;

namespace PetShop.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Tutor> Tutores { get; set; }
    public DbSet<Animal> Animais { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tutor>()
            .HasMany(t => t.Animais)
            .WithOne(a => a.Tutor)
            .HasForeignKey(a => a.TutorId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.Email)
            .IsUnique();

        base.OnModelCreating(modelBuilder);
    }
}
