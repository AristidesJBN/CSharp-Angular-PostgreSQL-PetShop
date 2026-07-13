using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PetShop.Api.Data;
using PetShop.Api.Dtos;
using PetShop.Api.Entities;
using PetShop.Api.Interfaces;

namespace PetShop.Api.Services;

public class AnimalService : IAnimalService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public AnimalService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AnimalDto>> GetAllAsync()
    {
        var animais = await _context.Animais
            .AsNoTracking()
            .Include(a => a.Tutor)
            .OrderBy(a => a.Nome)
            .ToListAsync();

        return _mapper.Map<IEnumerable<AnimalDto>>(animais);
    }

    public async Task<AnimalDto?> GetByIdAsync(int id)
    {
        var animal = await _context.Animais
            .AsNoTracking()
            .Include(a => a.Tutor)
            .FirstOrDefaultAsync(a => a.Id == id);

        return animal is null ? null : _mapper.Map<AnimalDto>(animal);
    }

    public async Task<AnimalDto> CreateAsync(CreateAnimalDto animalDto)
    {
        var tutorExists = await _context.Tutores.AnyAsync(t => t.Id == animalDto.TutorId);
        if (!tutorExists)
        {
            throw new InvalidOperationException("Tutor informado não existe.");
        }

        var animal = _mapper.Map<Animal>(animalDto);
        _context.Animais.Add(animal);
        await _context.SaveChangesAsync();

        var created = await _context.Animais
            .Include(a => a.Tutor)
            .FirstAsync(a => a.Id == animal.Id);

        return _mapper.Map<AnimalDto>(created);
    }

    public async Task<AnimalDto?> UpdateAsync(int id, UpdateAnimalDto animalDto)
    {
        var animal = await _context.Animais
            .Include(a => a.Tutor)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (animal is null)
        {
            return null;
        }

        var tutorExists = await _context.Tutores.AnyAsync(t => t.Id == animalDto.TutorId);
        if (!tutorExists)
        {
            throw new InvalidOperationException("Tutor informado não existe.");
        }

        animal.Nome = animalDto.Nome;
        animal.Idade = animalDto.Idade;
        animal.Peso = animalDto.Peso;
        animal.DataNascimento = animalDto.DataNascimento;
        animal.Foto = animalDto.Foto;
        animal.Especie = animalDto.Especie;
        animal.TutorId = animalDto.TutorId;

        await _context.SaveChangesAsync();
        return _mapper.Map<AnimalDto>(animal);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var animal = await _context.Animais.FirstOrDefaultAsync(a => a.Id == id);
        if (animal is null)
        {
            return false;
        }

        _context.Animais.Remove(animal);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<DashboardDto> GetDashboardAsync()
    {
        var totalAnimais = await _context.Animais.CountAsync();
        var totalTutores = await _context.Tutores.CountAsync();
        var especies = await _context.Animais
            .GroupBy(a => a.Especie)
            .Select(g => g.Key)
            .Distinct()
            .ToListAsync();

        return new DashboardDto
        {
            TotalAnimais = totalAnimais,
            TotalTutores = totalTutores,
            EspeciesCadastradas = especies.Count
        };
    }
}
