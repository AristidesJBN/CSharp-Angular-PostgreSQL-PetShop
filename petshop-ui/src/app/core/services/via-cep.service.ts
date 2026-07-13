import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Injectable({ providedIn: 'root' })
export class ViaCepService {
  constructor(private readonly http: HttpClient) {}

  buscar(cep: string): Observable<ViaCepResponse> {
    return this.http.get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json`);
  }
}
