import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import {
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
} from '@angular/material';

import { ManageDBModule } from './manageDB/manage-db.module';
import { PracticeModule } from './practice/practice.module';

import { AppComponent } from './app.component';
import { InicioComponent } from './shared/components/inicio';
import { PruebaComponent } from './shared/components/prueba';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PruebaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    ManageDBModule,
    PracticeModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
