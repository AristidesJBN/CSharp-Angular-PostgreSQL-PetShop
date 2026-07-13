using System.ComponentModel.DataAnnotations;

namespace PetShop.Api.Dtos;

public class CreateUsuarioDto
{
    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(250)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Senha { get; set; } = string.Empty;
}
