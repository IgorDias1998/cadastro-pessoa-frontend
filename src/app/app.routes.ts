import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pessoas',
    loadComponent: () =>
      import('./pages/pessoas/pessoas-list/pessoas-list').then(m => m.PessoasListComponent)
  },
  {
    path: 'pessoas/novo',
    loadComponent: () =>
      import('./pages/pessoas/pessoas-form/pessoas-form').then(m => m.PessoasFormComponent)
  },
  {
    path: 'pessoas/editar/:id',
    loadComponent: () =>
      import('./pages/pessoas/pessoas-form/pessoas-form').then(m => m.PessoasFormComponent)
  }
];
