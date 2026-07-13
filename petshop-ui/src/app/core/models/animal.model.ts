export interface Animal {
  id: number;
  nome: string;
  idade: number;
  peso: number;
  dataNascimento: string;
  foto?: string;
  especie: string;
  tutorId: number;
  tutorNome?: string;
  cidade?: string;
}

export interface AnimalPayload {
  nome: string;
  idade: number;
  peso: number;
  dataNascimento: string;
  foto?: string;
  especie: string;
  tutorId: number;
}
