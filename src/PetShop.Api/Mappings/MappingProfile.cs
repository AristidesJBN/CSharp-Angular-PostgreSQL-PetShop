using AutoMapper;
using PetShop.Api.Dtos;
using PetShop.Api.Entities;

namespace PetShop.Api.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Tutor, TutorDto>().ReverseMap();
        CreateMap<CreateAnimalDto, Animal>();
        CreateMap<UpdateAnimalDto, Animal>();
        CreateMap<Animal, AnimalDto>()
            .ForMember(dest => dest.TutorNome, opt => opt.MapFrom(src => src.Tutor.Nome))
            .ForMember(dest => dest.Cidade, opt => opt.MapFrom(src => src.Tutor.Cidade));
    }
}
