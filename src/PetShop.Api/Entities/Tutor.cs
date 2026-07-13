using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetShop.Api.Entities;

public class Tutor
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

    public ICollection<Animal> Animais { get; set; } = new List<Animal>();
}
