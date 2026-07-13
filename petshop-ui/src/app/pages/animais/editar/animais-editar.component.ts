import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../../core/services/animal.service';
import { TutorService } from '../../../core/services/tutor.service';
import { ViaCepService } from '../../../core/services/via-cep.service';

@Component({
  selector: 'app-animais-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  template: `
    <mat-card>
      <mat-card-title>Editar animal</mat-card-title>

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
        </div>

        <button mat-flat-button color="primary" type="submit">Salvar alterações</button>
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
export class AnimaisEditarComponent implements OnInit {
  protected tutores: Array<{ id: number; nome: string }> = [];
  private animalId = 0;
  protected form!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly animalService: AnimalService,
    private readonly tutorService: TutorService,
    private readonly viaCepService: ViaCepService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.form = this.fb.nonNullable.group({
      foto: [''],
      nome: ['', [Validators.required]],
      idade: [0, [Validators.required, Validators.min(1)]],
      peso: [0, [Validators.required, Validators.min(0.01)]],
      dataNascimento: ['', [Validators.required]],
      especie: ['', [Validators.required]],
      tutorId: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.animalId = Number(this.route.snapshot.paramMap.get('id'));

    this.tutorService.getAll().subscribe((tutores) => {
      this.tutores = tutores;
    });

    this.animalService.getById(this.animalId).subscribe((animal) => {
      this.form.patchValue({
        foto: animal.foto ?? '',
        nome: animal.nome,
        idade: animal.idade,
        peso: animal.peso,
        dataNascimento: animal.dataNascimento.slice(0, 10),
        especie: animal.especie,
        tutorId: animal.tutorId
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

    this.animalService.update(this.animalId, payload).subscribe({
      next: () => {
        this.snackBar.open('Animal atualizado com sucesso.', 'Fechar', { duration: 3000 });
        this.router.navigate(['/animais']);
      },
      error: () => {
        this.snackBar.open('Não foi possível atualizar o animal.', 'Fechar', { duration: 3000 });
      }
    });
  }
}
