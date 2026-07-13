using PetShop.Api.Dtos;
using PetShop.Api.Interfaces;
using PetShop.Api.Authentication;

namespace PetShop.Api.Services;

public class AuthService : IAuthService
{
    private readonly IUsuarioService _usuarioService;
    private readonly JwtTokenService _jwtTokenService;

    public AuthService(IUsuarioService usuarioService, JwtTokenService jwtTokenService)
    {
        _usuarioService = usuarioService;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<LoginResponseDto?> LoginAsync(LoginDto loginDto)
    {
        var usuario = await _usuarioService.GetByEmailAsync(loginDto.Email);

        if (usuario is null)
        {
            return null;
        }

        var passwordValid = PasswordService.VerifyPassword(loginDto.Senha, usuario.SenhaHash, usuario.SenhaSalt);
        if (!passwordValid)
        {
            return null;
        }

        var token = _jwtTokenService.GenerateToken(usuario);

        return new LoginResponseDto
        {
            Token = token,
            Nome = usuario.Nome,
            Email = usuario.Email
        };
    }
}
