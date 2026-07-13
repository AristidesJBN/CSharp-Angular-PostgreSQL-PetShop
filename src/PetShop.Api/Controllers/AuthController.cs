using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Api.Dtos;
using PetShop.Api.Interfaces;

namespace PetShop.Api.Controllers;

[ApiController]
[Route("")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var response = await _authService.LoginAsync(loginDto);
        if (response is null)
        {
            return Unauthorized();
        }

        return Ok(response);
    }
}
