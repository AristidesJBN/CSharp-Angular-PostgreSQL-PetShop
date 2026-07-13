import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AnimalService } from '../../core/services/animal.service';
import { DashboardSummary } from '../../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="dashboard-grid">
      <mat-card>
        <mat-card-title>Quantidade de animais</mat-card-title>
        <mat-card-content>{{ summary?.totalAnimais ?? 0 }}</mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Quantidade de tutores</mat-card-title>
        <mat-card-content>{{ summary?.totalTutores ?? 0 }}</mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Espécies cadastradas</mat-card-title>
        <mat-card-content>{{ summary?.especiesCadastradas ?? 0 }}</mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
      }

      mat-card {
        padding: 16px;
      }

      mat-card-content {
        font-size: 2rem;
        font-weight: 700;
      }
    `
  ]
})
export class DashboardComponent implements OnInit {
  protected summary?: DashboardSummary;

  constructor(private readonly animalService: AnimalService) {}

  ngOnInit(): void {
    this.animalService.getDashboard().subscribe((result) => {
      this.summary = result;
    });
  }
}
