using PetShop.Api.Dtos;

namespace PetShop.Api.Interfaces;

public interface ITutorService
{
    Task<IEnumerable<TutorDto>> GetAllAsync();
    Task<TutorDto?> GetByIdAsync(int id);
    Task<TutorDto> CreateAsync(TutorDto tutorDto);
    Task<TutorDto?> UpdateAsync(int id, TutorDto tutorDto);
    Task<bool> DeleteAsync(int id);
}
