import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticeSelectComponent } from './practice-select.component';

import { PracticeRoutingModule } from './practice-routing.component';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    PracticeRoutingModule,
  ],
  declarations: [
    PracticeSelectComponent,
  ],
  entryComponents: [
  ],
})
export class PracticeModule {}
