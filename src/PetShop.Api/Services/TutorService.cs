using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PetShop.Api.Data;
using PetShop.Api.Dtos;
using PetShop.Api.Entities;
using PetShop.Api.Interfaces;

namespace PetShop.Api.Services;

public class TutorService : ITutorService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public TutorService(ApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TutorDto>> GetAllAsync()
    {
        var tutores = await _context.Tutores.AsNoTracking().ToListAsync();
        return _mapper.Map<IEnumerable<TutorDto>>(tutores);
    }

    public async Task<TutorDto?> GetByIdAsync(int id)
    {
        var tutor = await _context.Tutores.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
        return tutor is null ? null : _mapper.Map<TutorDto>(tutor);
    }

    public async Task<TutorDto> CreateAsync(TutorDto tutorDto)
    {
        var tutor = _mapper.Map<Tutor>(tutorDto);
        _context.Tutores.Add(tutor);
        await _context.SaveChangesAsync();
        return _mapper.Map<TutorDto>(tutor);
    }

    public async Task<TutorDto?> UpdateAsync(int id, TutorDto tutorDto)
    {
        var tutor = await _context.Tutores.FirstOrDefaultAsync(t => t.Id == id);
        if (tutor is null)
        {
            return null;
        }

        tutor.Nome = tutorDto.Nome;
        tutor.CEP = tutorDto.CEP;
        tutor.Logradouro = tutorDto.Logradouro;
        tutor.Numero = tutorDto.Numero;
        tutor.Bairro = tutorDto.Bairro;
        tutor.Cidade = tutorDto.Cidade;
        tutor.UF = tutorDto.UF;

        await _context.SaveChangesAsync();
        return _mapper.Map<TutorDto>(tutor);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var tutor = await _context.Tutores
            .Include(t => t.Animais)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (tutor is null)
        {
            return false;
        }

        _context.Tutores.Remove(tutor);
        await _context.SaveChangesAsync();
        return true;
    }
}
