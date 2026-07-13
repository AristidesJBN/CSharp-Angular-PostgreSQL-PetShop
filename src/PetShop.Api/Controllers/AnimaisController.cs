using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Api.Dtos;
using PetShop.Api.Interfaces;

namespace PetShop.Api.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class AnimaisController : ControllerBase
{
    private readonly IAnimalService _animalService;

    public AnimaisController(IAnimalService animalService)
    {
        _animalService = animalService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var animais = await _animalService.GetAllAsync();
        return Ok(animais);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var animal = await _animalService.GetByIdAsync(id);
        if (animal is null)
        {
            return NotFound();
        }

        return Ok(animal);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateAnimalDto animalDto)
    {
        try
        {
            var created = await _animalService.CreateAsync(animalDto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateAnimalDto animalDto)
    {
        try
        {
            var updated = await _animalService.UpdateAsync(id, animalDto);
            if (updated is null)
            {
                return NotFound();
            }

            return Ok(updated);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _animalService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> Dashboard()
    {
        var dashboard = await _animalService.GetDashboardAsync();
        return Ok(dashboard);
    }
}
