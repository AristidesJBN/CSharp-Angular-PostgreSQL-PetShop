import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { TutorService } from '../../core/services/tutor.service';
import { Tutor } from '../../core/models/tutor.model';

@Component({
  selector: 'app-tutores',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, RouterLink],
  template: `
    <mat-card>
      <div class="toolbar">
        <mat-card-title>Tutores</mat-card-title>
        <a mat-flat-button color="primary" routerLink="/tutores/cadastro">Novo tutor</a>
      </div>
      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="nome">
          <th mat-header-cell *matHeaderCellDef>Nome</th>
          <td mat-cell *matCellDef="let row">{{ row.nome }}</td>
        </ng-container>

        <ng-container matColumnDef="cidade">
          <th mat-header-cell *matHeaderCellDef>Cidade</th>
          <td mat-cell *matCellDef="let row">{{ row.cidade }}</td>
        </ng-container>

        <ng-container matColumnDef="uf">
          <th mat-header-cell *matHeaderCellDef>UF</th>
          <td mat-cell *matCellDef="let row">{{ row.uf }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </mat-card>
  `,
  styles: [
    `
      .toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 12px; }
      table { width: 100%; }
    `
  ]
})
export class TutoresComponent implements OnInit {
  protected readonly displayedColumns = ['nome', 'cidade', 'uf'];
  protected readonly dataSource = new MatTableDataSource<Tutor>();

  constructor(private readonly tutorService: TutorService) {}

  ngOnInit(): void {
    this.tutorService.getAll().subscribe((tutores) => {
      this.dataSource.data = tutores;
    });
  }
}
