using PetShop.Api.Dtos;

namespace PetShop.Api.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDto?> LoginAsync(LoginDto loginDto);
}
