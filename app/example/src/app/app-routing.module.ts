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
        path: 'usuarios',
        loadChildren: lazy(() => import('./pages/usuario'), 'UsuarioModule'),
        data: {
          title: 'Usuários cadastrados',
          breadcrumb: 'Usuários',
        },
      },
      {
        path: '',
        loadChildren: lazy(() => import('./pages/home'), 'HomeModule'),
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
