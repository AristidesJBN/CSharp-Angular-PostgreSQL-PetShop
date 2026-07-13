using System.ComponentModel.DataAnnotations;

namespace PetShop.Api.Dtos;

public class TutorDto
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [MaxLength(9)]
    public string CEP { get; set; } = string.Empty;

    [Required]
    [MaxLength(250)]
    public string Logradouro { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string Numero { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string Bairro { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string Cidade { get; set; } = string.Empty;

    [Required]
    [MaxLength(2)]
    public string UF { get; set; } = string.Empty;
}
