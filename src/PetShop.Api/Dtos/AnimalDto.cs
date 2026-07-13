using System.ComponentModel.DataAnnotations;

namespace PetShop.Api.Dtos;

public class AnimalDto
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [Range(1, int.MaxValue)]
    public int Idade { get; set; }

    [Required]
    [Range(0.01, double.MaxValue)]
    public decimal Peso { get; set; }

    [Required]
    public DateTime DataNascimento { get; set; }

    public string? Foto { get; set; }

    [Required]
    [MaxLength(100)]
    public string Especie { get; set; } = string.Empty;

    [Required]
    public int TutorId { get; set; }

    public string? TutorNome { get; set; }
    public string? Cidade { get; set; }
}
