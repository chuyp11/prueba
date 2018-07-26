import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PracticeSelectComponent } from './practice-select.component';


const Routes: Routes = [
  { path: 'practicar/seleccionar', component: PracticeSelectComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(Routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PracticeRoutingModule {}
