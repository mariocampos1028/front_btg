import { Routes } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { RegistrarComponent } from './registrar/registrar.component';

export const routes: Routes = [
  { path: 'listar', component: ListarComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: '', redirectTo: '/registrar', pathMatch: 'full' }, // Redirige a 'registrar' por defecto
  { path: '**', redirectTo: '/registrar' } // Redirige a 'registrar' si la ruta no es válida
];
