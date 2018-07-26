import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ManageService } from '../manage-db.service';
import { SectionService } from '../../shared/services/section.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';

import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog } from '@angular/material';

import { SectionDeleteComponent } from './section-delete.component';

@Component({
  selector: 'app-section-read',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Secciones</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Lectura Materias-->
    <mat-card >
      <mat-table #table [dataSource]="sections">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
          <mat-cell *matCellDef="let section"> {{section.id}} </mat-cell>
        </ng-container>
        <!-- Nombre Column -->
        <ng-container matColumnDef="text">
          <mat-header-cell *matHeaderCellDef> Seccion </mat-header-cell>
          <mat-cell *matCellDef="let section"> {{section.text}} </mat-cell>
        </ng-container>
        <ng-container matColumnDef="index">
          <mat-header-cell *matHeaderCellDef> Indice </mat-header-cell>
          <mat-cell *matCellDef="let section"> {{section.index}} </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let section; columns: displayedColumns;" (click) = openBottomSheet(section) ></mat-row>
      </mat-table>
    </mat-card>
    <!-- floating-button-->
    <button class="floating-button" mat-fab
    (click)="add()"><mat-icon>add</mat-icon>
    </button>
  </div>
  `,
  styleUrls: ['../manage-db.component.css'],
  animations: []
})
export class SectionReadComponent implements OnInit, OnDestroy {

  sections: Section[] = [];
  section: Section;
  subjects: Subject[] = [];
  subject: Subject;
  displayedColumns = ['text', 'index'];
  subscription: any;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private sectionService: SectionService,
    private router: Router,
    private location: Location,
    private bottomSheet: MatBottomSheet) {
      this.subject = this.manageService.getSubject();
      this.read();
  }

  ngOnInit() {}

  read() {
    this.subscription = this.sectionService.readAll(this.subject)
      .subscribe((sections: Section[]) => {
        this.sections = sections;
        this.manageService.setQuantitySections(this.sections.length);
      }
    );
  }

  add() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/secciones/alta']);
  }

  openBottomSheet(section: Section): void {
    this.manageService.setSection(section);
    this.bottomSheet.open(SectionReadSheetComponent, {
      data: section
    });
  }

  back() {
    this.serviceRouterAnimation.setStateRouterAnimation('back');
    this.location.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

@Component({
  selector: 'app-read-section-sheet',
  template: `
    <mat-list>
      <mat-list-item (click)="open()">Preguntas de {{section.text}}</mat-list-item>
      <mat-list-item (click)="update()">Editar {{section.text}}</mat-list-item>
      <mat-list-item (click)="delete()">Eliminar {{section.text}}</mat-list-item>
    </mat-list>
  `,
  styleUrls: ['../manage-db.component.css'],
})
export class SectionReadSheetComponent {

  section: Section;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<SectionReadSheetComponent>,
    public dialog: MatDialog,
    private router: Router) {
      this.section = data;
    }

  open() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/secciones/preguntas']);
    this.bottomSheetRef.dismiss();
  }

  update() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/secciones/cambio']);
    this.bottomSheetRef.dismiss();
  }

  delete() {
    this.dialog.open(SectionDeleteComponent, {
      data: this.section
    });
    this.bottomSheetRef.dismiss();
  }
}
