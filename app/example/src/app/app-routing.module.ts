import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

function lazy<T>(importer: () => Promise<T>, mod: keyof T) {
  return () => importer().then((ref) => ref[mod])
}

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: lazy(() => import('@app-pages/home'), 'HomeModule'),
        data: {
          navigator: {
            usuarios: ['usuarios'],
          },
        },
      },
      {
        path: 'usuarios',
        loadChildren: lazy(() => import('./pages/usuario'), 'UsuarioModule'),
        data: {
          title: 'Usuários cadastrados',
          breadcrumb: 'Usuários',
        },
      },
    ],
    data: {
      breadcrumb: 'Início',
    },
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
