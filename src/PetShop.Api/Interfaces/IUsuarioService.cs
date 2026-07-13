using PetShop.Api.Dtos;
using PetShop.Api.Entities;

namespace PetShop.Api.Interfaces;

public interface IUsuarioService
{
    Task<Usuario?> GetByEmailAsync(string email);
    Task<Usuario> CreateAsync(CreateUsuarioDto usuarioDto);
}
