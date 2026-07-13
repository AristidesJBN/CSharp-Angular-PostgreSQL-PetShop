import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { TutorService } from '../../core/services/tutor.service';
import { Tutor } from '../../core/models/tutor.model';

@Component({
  selector: 'app-tutores',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  template: `
    <mat-card>
      <mat-card-title>Tutores</mat-card-title>
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
