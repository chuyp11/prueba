import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { RouterAnimationsService } from '../services/router-animations.service';

@Component({
  selector: 'app-inicio',
  template: `
  <div>
    <mat-toolbar class="toolbar" color="primary">
      <mat-icon class="toolbarIcono" (click)= regresar()>arrow_back</mat-icon>
      <p class="toolbarTitulo">Inico</p>
    </mat-toolbar>
    <div class="contenedor" >
      <mat-card class="card" (click) = openManageDB()>
        <mat-card-header>
          <mat-card-title>Administrar Base de datos</mat-card-title>
        </mat-card-header>
      </mat-card>
      <mat-card class="card">
        <mat-card-header (click) = openPractice()>
          <mat-card-title>Practicar Examen Preparatoria</mat-card-title>
          <mat-card-subtitle>Bla bla bla bla</mat-card-subtitle>
        </mat-card-header>
      </mat-card>
      <mat-card class="card">
        <mat-card-header (click) = openPrueba()>
          <mat-card-title>Prueba</mat-card-title>
          <mat-card-subtitle>Bla bla bla bla</mat-card-subtitle>
        </mat-card-header>
      </mat-card>
    </div>
  </div>
  `,
  styleUrls: ['./component.component.css'],
})
export class InicioComponent implements OnInit, AfterViewInit {

  public state: string;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private router: Router,
    private location: Location) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  openManageDB() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias']);
  }

  openPractice() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['practicar/seleccionar']);
  }

  openPrueba() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['prueba']);
  }

  regresar() {
    this.serviceRouterAnimation.setStateRouterAnimation('back');
    this.location.back();
  }
}
