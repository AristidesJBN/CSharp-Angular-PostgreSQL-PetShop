using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Api.Dtos;
using PetShop.Api.Interfaces;

namespace PetShop.Api.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UsuariosController : ControllerBase
{
    private readonly IUsuarioService _usuarioService;

    public UsuariosController(IUsuarioService usuarioService)
    {
        _usuarioService = usuarioService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUsuarioDto usuarioDto)
    {
        try
        {
            var usuario = await _usuarioService.CreateAsync(usuarioDto);
            return Created(string.Empty, usuario);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
