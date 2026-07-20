using System.ComponentModel.DataAnnotations;

namespace PetShop.Api.Dtos;

public class UpdateAnimalDto
{
    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [Range(0, int.MaxValue)]
    public int Idade { get; set; }

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Peso { get; set; }

    [Required]
    public DateTime DataNascimento { get; set; }

    [Required]
    [MaxLength(100)]
    public string Especie { get; set; } = string.Empty;

    [Required]
    public int TutorId { get; set; }
}
