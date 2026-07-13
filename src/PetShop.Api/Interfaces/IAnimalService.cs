using PetShop.Api.Dtos;

namespace PetShop.Api.Interfaces;

public interface IAnimalService
{
    Task<IEnumerable<AnimalDto>> GetAllAsync();
    Task<AnimalDto?> GetByIdAsync(int id);
    Task<AnimalDto> CreateAsync(CreateAnimalDto animalDto);
    Task<AnimalDto?> UpdateAsync(int id, UpdateAnimalDto animalDto);
    Task<bool> DeleteAsync(int id);
    Task<DashboardDto> GetDashboardAsync();
}
