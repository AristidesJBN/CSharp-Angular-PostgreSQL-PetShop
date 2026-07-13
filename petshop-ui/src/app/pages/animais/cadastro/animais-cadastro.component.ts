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
import { AnimalService } from '../../../core/services/animal.service';
import { TutorService } from '../../../core/services/tutor.service';
import { UploadService } from '../../../core/services/upload.service';
import { ViaCepService } from '../../../core/services/via-cep.service';

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
            <mat-label>Foto</mat-label>
            <input matInput formControlName="foto" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="nome" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Idade</mat-label>
            <input matInput type="number" formControlName="idade" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Peso</mat-label>
            <input matInput type="number" step="0.01" formControlName="peso" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Data de nascimento</mat-label>
            <input matInput type="date" formControlName="dataNascimento" />
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

          <mat-form-field appearance="outline">
            <mat-label>CEP</mat-label>
            <input matInput formControlName="cep" (blur)="buscarCep()" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Número</mat-label>
            <input matInput formControlName="numero" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Logradouro</mat-label>
            <input matInput formControlName="logradouro" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Bairro</mat-label>
            <input matInput formControlName="bairro" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Cidade</mat-label>
            <input matInput formControlName="cidade" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>UF</mat-label>
            <input matInput formControlName="uf" />
          </mat-form-field>
        </div>

        <button mat-flat-button color="primary" type="submit">Salvar</button>
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly animalService: AnimalService,
    private readonly tutorService: TutorService,
    private readonly viaCepService: ViaCepService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly uploadService: UploadService
  ) {
    this.form = this.fb.nonNullable.group({
      foto: [''],
      nome: ['', [Validators.required]],
      idade: [0, [Validators.required, Validators.min(1)]],
      peso: [0, [Validators.required, Validators.min(0.01)]],
      dataNascimento: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      tutorId: [0, [Validators.required, Validators.min(1)]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.tutorService.getAll().subscribe((tutores) => {
      this.tutores = tutores;
    });
  }

  buscarCep(): void {
    const cep = this.form.get('cep')?.value?.toString().replace(/\D/g, '');
    if (!cep || cep.length !== 8) {
      return;
    }

    this.viaCepService.buscar(cep).subscribe((response) => {
      this.form.patchValue({
        logradouro: response.logradouro,
        bairro: response.bairro,
        cidade: response.localidade,
        uf: response.uf
      });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.snackBar.open('Preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
      return;
    }

    const payload = {
      nome: this.form.get('nome')?.value,
      idade: this.form.get('idade')?.value,
      peso: this.form.get('peso')?.value,
      dataNascimento: this.form.get('dataNascimento')?.value,
      especie: this.form.get('especie')?.value,
      tutorId: this.form.get('tutorId')?.value,
      foto: this.form.get('foto')?.value || undefined
    };

    this.animalService.create(payload).subscribe({
      next: () => {
        this.snackBar.open('Animal cadastrado com sucesso.', 'Fechar', { duration: 3000 });
        this.router.navigate(['/animais']);
      },
      error: () => {
        this.snackBar.open('Não foi possível cadastrar o animal.', 'Fechar', { duration: 3000 });
      }
    });
  }
}
