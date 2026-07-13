using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PetShop.Api.Controllers;

[ApiController]
[Authorize]
[Route("upload")]
public class UploadController : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("Arquivo inválido.");
        }

        var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
        Directory.CreateDirectory(uploadsFolder);

        var fileName = $"{Guid.NewGuid():N}_{Path.GetFileName(file.FileName)}";
        var filePath = Path.Combine(uploadsFolder, fileName);

        await using var stream = System.IO.File.Create(filePath);
        await file.CopyToAsync(stream);

        return Ok($"/uploads/{fileName}");
    }
}
