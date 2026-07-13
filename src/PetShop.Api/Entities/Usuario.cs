using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PetShop.Api.Entities;

public class Usuario
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(250)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public byte[] SenhaHash { get; set; } = Array.Empty<byte>();

    [Required]
    public byte[] SenhaSalt { get; set; } = Array.Empty<byte>();
}
