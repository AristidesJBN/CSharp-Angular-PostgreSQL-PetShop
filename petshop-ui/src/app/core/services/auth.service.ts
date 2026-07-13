import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'petshop-token';
  private readonly userKey = 'petshop-user';
  public readonly isAuthenticated = signal(false);

  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.isAuthenticated.set(Boolean(this.getToken()));
  }

  login(payload: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:5200/login', payload).pipe(
      tap((response) => {
        this.saveToken(response.token);
        this.saveUser({ nome: response.nome, email: response.email });
        this.isAuthenticated.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): { nome: string; email: string } | null {
    const raw = localStorage.getItem(this.userKey);
    return raw ? (JSON.parse(raw) as { nome: string; email: string }) : null;
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private saveUser(user: { nome: string; email: string }): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }
}
