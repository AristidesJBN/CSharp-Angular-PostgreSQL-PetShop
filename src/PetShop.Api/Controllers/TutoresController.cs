using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PetShop.Api.Dtos;
using PetShop.Api.Interfaces;

namespace PetShop.Api.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class TutoresController : ControllerBase
{
    private readonly ITutorService _tutorService;

    public TutoresController(ITutorService tutorService)
    {
        _tutorService = tutorService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tutores = await _tutorService.GetAllAsync();
        return Ok(tutores);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var tutor = await _tutorService.GetByIdAsync(id);
        if (tutor is null)
        {
            return NotFound();
        }

        return Ok(tutor);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TutorDto tutorDto)
    {
        var created = await _tutorService.CreateAsync(tutorDto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] TutorDto tutorDto)
    {
        var updated = await _tutorService.UpdateAsync(id, tutorDto);
        if (updated is null)
        {
            return NotFound();
        }

        return Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _tutorService.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
