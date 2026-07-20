import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  template: `
    <div class="login-wrapper">
      <mat-card class="login-card">
        <mat-card-title>PetShop Manager</mat-card-title>
        <mat-card-subtitle>Entre com sua conta</mat-card-subtitle>

        <form [formGroup]="form" (ngSubmit)="submit()">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Senha</mat-label>
            <input matInput formControlName="senha" type="password" />
          </mat-form-field>

          <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || isSubmitting">{{ isSubmitting ? 'Entrando...' : 'Entrar' }}</button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-wrapper {
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #f2f6ff, #eef3ff);
      }

      .login-card {
        width: min(420px, calc(100vw - 2rem));
        padding: 1rem;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 12px;
      }
    `
  ]
})
export class LoginComponent {
  protected form!: FormGroup;
  protected isSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {
    this.form = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit(): void {
    if (this.form.invalid || this.isSubmitting) {
      this.snackBar.open('Preencha um email e senha válidos.', 'Fechar', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;
    this.authService.login(this.form.getRawValue())
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.snackBar.open('Credenciais inválidas.', 'Fechar', { duration: 3000 });
        }
      });
  }
}
