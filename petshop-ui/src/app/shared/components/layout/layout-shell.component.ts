import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    RouterOutlet
  ],
  template: `
    <mat-sidenav-container class="shell-container">
      <mat-sidenav mode="side" opened>
        <div class="brand">PetShop Manager</div>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard"><mat-icon>dashboard</mat-icon> Dashboard</a>
          <a mat-list-item routerLink="/animais"><mat-icon>pets</mat-icon> Animais</a>
          <a mat-list-item routerLink="/tutores"><mat-icon>people</mat-icon> Tutores</a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>PetShop Manager</span>
          <span class="spacer"></span>
          <button mat-icon-button (click)="logout()">
            <mat-icon>logout</mat-icon>
          </button>
        </mat-toolbar>

        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .shell-container {
        height: 100vh;
      }

      .brand {
        padding: 20px;
        font-weight: 700;
        font-size: 1.1rem;
      }

      .spacer { flex: 1 1 auto; }
      .page-content { padding: 24px; }
    `
  ]
})
export class LayoutShellComponent {
  public readonly title = signal('PetShop Manager');

  constructor(private readonly authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
