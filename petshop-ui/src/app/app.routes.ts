import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LayoutShellComponent } from './shared/components/layout/layout-shell.component';
import { AnimaisListaComponent } from './pages/animais/lista/animais-lista.component';
import { AnimaisCadastroComponent } from './pages/animais/cadastro/animais-cadastro.component';
import { AnimaisEditarComponent } from './pages/animais/editar/animais-editar.component';
import { TutoresComponent } from './pages/tutores/tutores.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutShellComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'animais', component: AnimaisListaComponent },
      { path: 'animais/cadastro', component: AnimaisCadastroComponent },
      { path: 'animais/editar/:id', component: AnimaisEditarComponent },
      { path: 'tutores', component: TutoresComponent }
    ]
  }
];
