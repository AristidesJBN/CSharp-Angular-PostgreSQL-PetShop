import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AnimalService } from '../../../core/services/animal.service';
import { TutorService } from '../../../core/services/tutor.service';

@Component({
  selector: 'app-animais-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  template: `
    <mat-card>
      <mat-card-title>Cadastro de animal</mat-card-title>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="grid">
          <mat-form-field appearance="outline">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="nome" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Data de nascimento</mat-label>
            <input matInput type="date" formControlName="dataNascimento" autocomplete="bday" />
            <mat-error *ngIf="form.get('dataNascimento')?.hasError('required')">Data de nascimento é obrigatória.</mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Peso</mat-label>
            <input matInput type="number" step="0.01" formControlName="peso" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Espécie</mat-label>
            <input matInput formControlName="especie" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Tutor</mat-label>
            <mat-select formControlName="tutorId">
              <mat-option *ngFor="let tutor of tutores" [value]="tutor.id">{{ tutor.nome }}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || isSubmitting" class="submit-button">
          {{ isSubmitting ? 'Salvando...' : 'Salvar' }}
        </button>
      </form>
    </mat-card>
  `,
  styles: [
    `
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
      form { display: flex; flex-direction: column; gap: 12px; }
    `
  ]
})
export class AnimaisCadastroComponent implements OnInit {
  protected tutores: Array<{ id: number; nome: string }> = [];
  protected form!: FormGroup;
  protected isSubmitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly animalService: AnimalService,
    private readonly tutorService: TutorService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      peso: [0, [Validators.required, Validators.min(0.01)]],
      especie: ['', [Validators.required]],
      tutorId: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.tutorService.getAll().subscribe((tutores) => {
      this.tutores = tutores;
    });
  }

  private parseIsoDate(value: string): Date | null {
    const normalized = String(value ?? '').trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
      return null;
    }

    const [year, month, day] = normalized.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }

    return date;
  }

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  submit(): void {
    if (this.form.invalid) {
      this.snackBar.open('Preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
      return;
    }

    const dataNascimentoValue = this.form.get('dataNascimento')?.value;
    const birthDate = this.parseIsoDate(dataNascimentoValue);
    if (birthDate === null) {
      this.snackBar.open('Data de nascimento inválida. Escolha uma data válida.', 'Fechar', { duration: 3000 });
      return;
    }

    const payload = {
      nome: this.form.get('nome')?.value,
      idade: this.calculateAge(birthDate),
      peso: this.form.get('peso')?.value,
      dataNascimento: birthDate.toISOString().slice(0, 10),
      especie: this.form.get('especie')?.value,
      tutorId: this.form.get('tutorId')?.value
    };

    this.isSubmitting = true;
    this.animalService.create(payload)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Animal cadastrado com sucesso.', 'Fechar', { duration: 3000 });
          this.router.navigate(['/animais']);
        },
        error: (error) => {
          console.error('Falha ao cadastrar animal', error);
          let message = 'Não foi possível cadastrar o animal.';

          if (error?.error) {
            if (typeof error.error === 'string') {
              message = error.error;
            } else if (error.error?.message) {
              message = error.error.message;
            } else if (error.error?.errors) {
              const validationErrors = Object.values(error.error.errors).flat();
              if (validationErrors.length) {
                message = validationErrors.join(' ');
              }
            }
          }

          this.snackBar.open(message, 'Fechar', { duration: 5000 });
        }
      });
  }
}
