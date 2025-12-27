import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pessoas',
    pathMatch: 'full' // faz o Angular redirecionar apenas se a URL for exatamente '/'
  },
  {
    path: 'pessoas',
    loadComponent: () =>
      import('./pages/pessoas/pessoas-list/pessoas-list')
        .then(m => m.PessoasListComponent)
  },
  {
    path: 'pessoas/novo',
    loadComponent: () =>
      import('./pages/pessoas/pessoas-form/pessoas-form')
        .then(m => m.PessoasFormComponent)
  },
  {
    path: 'pessoas/editar/:id',
    loadComponent: () =>
      import('./pages/pessoas/pessoas-form/pessoas-form')
        .then(m => m.PessoasFormComponent)
  },
  {
    path: '**',
    redirectTo: 'pessoas' // qualquer rota desconhecida leva para 'pessoas'
  }
];
