import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnimalService } from '../../../core/services/animal.service';
import { Animal } from '../../../core/models/animal.model';

@Component({
  selector: 'app-animais-lista',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, RouterLink],
  template: `
    <mat-card class="table-card">
      <div class="toolbar">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Pesquisar</mat-label>
          <input matInput [formControl]="searchControl" placeholder="Nome, espécie ou tutor" />
        </mat-form-field>

        <a mat-flat-button color="primary" routerLink="/animais/cadastro">Novo animal</a>
      </div>

      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z2 full-width-table">
      <ng-container matColumnDef="nome">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Nome</th>
        <td mat-cell *matCellDef="let row">{{ row.nome }}</td>
      </ng-container>

      <ng-container matColumnDef="especie">
        <th mat-header-cell *matHeaderCellDef mat-sort-header>Espécie</th>
        <td mat-cell *matCellDef="let row">{{ row.especie }}</td>
      </ng-container>

      <ng-container matColumnDef="tutorNome">
        <th mat-header-cell *matHeaderCellDef>Tutor</th>
        <td mat-cell *matCellDef="let row">{{ row.tutorNome }}</td>
      </ng-container>

      <ng-container matColumnDef="cidade">
        <th mat-header-cell *matHeaderCellDef>Cidade</th>
        <td mat-cell *matCellDef="let row">{{ row.cidade }}</td>
      </ng-container>

      <ng-container matColumnDef="editar">
        <th mat-header-cell *matHeaderCellDef>Editar</th>
        <td mat-cell *matCellDef="let row">
          <a mat-icon-button [routerLink]="['/animais/editar', row.id]" aria-label="Editar"><mat-icon>edit</mat-icon></a>
        </td>
      </ng-container>

      <ng-container matColumnDef="excluir">
        <th mat-header-cell *matHeaderCellDef>Excluir</th>
        <td mat-cell *matCellDef="let row">
          <button mat-icon-button color="warn" (click)="delete(row.id)" aria-label="Excluir"><mat-icon>delete</mat-icon></button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>

    <mat-paginator [pageSizeOptions]="[5, 10, 25]" showFirstLastButtons aria-label="Select page of animals"></mat-paginator>
  `,
  styles: [
    `
      .toolbar { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 16px; }
      .thumb { width: 48px; height: 48px; object-fit: cover; border-radius: 6px; }
      table { width: 100%; }
    `
  ]
})
export class AnimaisListaComponent implements OnInit, AfterViewInit {
  protected readonly displayedColumns = ['nome', 'especie', 'tutorNome', 'cidade', 'editar', 'excluir'];
  protected readonly searchControl = new FormControl('');
  protected readonly dataSource = new MatTableDataSource<Animal>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly animalService: AnimalService,
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.load();
    this.searchControl.valueChanges.subscribe(() => this.applyFilter());
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private load(): void {
    this.animalService.getAll().subscribe((animals) => {
      this.dataSource.data = animals;
    });
  }

  private applyFilter(): void {
    const filterValue = this.searchControl.value?.trim().toLowerCase() ?? '';
    this.dataSource.filter = filterValue;
  }

  protected delete(id: number): void {
    const confirmed = window.confirm('Deseja realmente excluir este animal?');
    if (!confirmed) {
      return;
    }

    this.animalService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Animal excluído com sucesso.', 'Fechar', { duration: 3000 });
        this.load();
      },
      error: () => {
        this.snackBar.open('Não foi possível excluir o animal.', 'Fechar', { duration: 3000 });
      }
    });
  }
}
