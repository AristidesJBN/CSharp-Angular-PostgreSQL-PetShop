import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutor } from '../models/tutor.model';

@Injectable({ providedIn: 'root' })
export class TutorService {
  private readonly apiUrl = 'http://localhost:5200/tutores';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.apiUrl);
  }

  getById(id: number): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`);
  }

  create(payload: Tutor): Observable<Tutor> {
    return this.http.post<Tutor>(this.apiUrl, payload);
  }

  update(id: number, payload: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
