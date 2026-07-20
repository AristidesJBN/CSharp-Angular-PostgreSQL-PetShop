using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetShop.Api.Entities;

public class Animal
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    public int Idade { get; set; }

    [Required]
    public decimal Peso { get; set; }

    [Required]
    public DateTime DataNascimento { get; set; }

    [Required]
    [MaxLength(100)]
    public string Especie { get; set; } = string.Empty;

    [Required]
    public int TutorId { get; set; }

    [ForeignKey(nameof(TutorId))]
    public Tutor Tutor { get; set; } = null!;
}
