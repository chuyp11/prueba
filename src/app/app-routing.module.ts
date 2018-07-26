import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './shared/components/inicio';
import { PruebaComponent } from './shared/components/prueba';

const appRoutes: Routes = [
  { path: 'inicio', component: InicioComponent,  data: { state: 'inicio' }},
  { path: 'prueba', component: PruebaComponent,  data: { state: 'prueba'}},
  { path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: InicioComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // {useHash: true}, Lo remonedaban en router-outlet animaciones
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
