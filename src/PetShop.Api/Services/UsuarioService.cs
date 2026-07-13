using Microsoft.EntityFrameworkCore;
using PetShop.Api.Data;
using PetShop.Api.Dtos;
using PetShop.Api.Entities;
using PetShop.Api.Interfaces;

namespace PetShop.Api.Services;

public class UsuarioService : IUsuarioService
{
    private readonly ApplicationDbContext _context;

    public UsuarioService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Usuario?> GetByEmailAsync(string email)
    {
        return await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public async Task<Usuario> CreateAsync(CreateUsuarioDto usuarioDto)
    {
        var existing = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Email.ToLower() == usuarioDto.Email.ToLower());

        if (existing is not null)
        {
            throw new InvalidOperationException("Já existe um usuário com este email.");
        }

        var (hash, salt) = PasswordService.HashPassword(usuarioDto.Senha);

        var usuario = new Usuario
        {
            Nome = usuarioDto.Nome,
            Email = usuarioDto.Email,
            SenhaHash = hash,
            SenhaSalt = salt
        };

        _context.Usuarios.Add(usuario);
        await _context.SaveChangesAsync();

        return usuario;
    }
}
