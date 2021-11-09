import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    // cuando alguien entra al path auth, carga sus hijos,
    // viene de auth.module, cuando se carga, entonces regresa el AutoModule
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then( m => m.AuthModule ) // LazyLoad
  },
  {
    path: 'heroes',
    loadChildren: () => import ('./heroes/heroes.module').then( m => m.HeroesModule ),
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ]
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({

  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule // Siempre hacer este export
  ]
})
export class AppRoutingModule { }
