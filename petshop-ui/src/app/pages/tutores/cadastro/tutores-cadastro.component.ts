import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TutorService } from '../../../core/services/tutor.service';
import { ViaCepService } from '../../../core/services/via-cep.service';
import { TutorPayload } from '../../../core/models/tutor.model';

@Component({
  selector: 'app-tutores-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <mat-card>
      <mat-card-title>Cadastro de tutor</mat-card-title>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <div class="grid">
          <mat-form-field appearance="outline">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="nome" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>CEP</mat-label>
            <input matInput formControlName="cep" (blur)="buscarCep()" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Logradouro</mat-label>
            <input matInput formControlName="logradouro" />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Número</mat-label>
            <input matInput formControlName="numero" />
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
export class TutoresCadastroComponent {
  protected form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly tutorService: TutorService,
    private readonly viaCepService: ViaCepService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      nome: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      uf: ['', [Validators.required]]
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

    const payload: TutorPayload = {
      nome: this.form.get('nome')?.value,
      cep: this.form.get('cep')?.value,
      logradouro: this.form.get('logradouro')?.value,
      numero: this.form.get('numero')?.value,
      bairro: this.form.get('bairro')?.value,
      cidade: this.form.get('cidade')?.value,
      uf: this.form.get('uf')?.value
    };

    this.tutorService.create(payload).subscribe({
      next: () => {
        this.snackBar.open('Tutor cadastrado com sucesso.', 'Fechar', { duration: 3000 });
        this.router.navigate(['/tutores']);
      },
      error: () => {
        this.snackBar.open('Não foi possível cadastrar o tutor.', 'Fechar', { duration: 3000 });
      }
    });
  }
}
