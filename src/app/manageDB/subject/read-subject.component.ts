import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ManageService } from '../manage-db.service';
import { SubjectService } from '../../shared/services/subject.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';

import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog } from '@angular/material';

import { DeleteSubjectComponent } from './delete-subject.component';

@Component({
  selector: 'app-read-subject',
  template: `
  <div>
    <mat-toolbar class="toolbar" color="primary">
      <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
      <p class="toolbarTitulo">Materias</p>
    </mat-toolbar>
    <div class="contenedor">
      <!-- Card Lectura Materias-->
      <mat-card >
        <mat-table #table [dataSource]="subjects">
          <!-- Id Column -->
          <ng-container matColumnDef="id">
            <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
            <mat-cell *matCellDef="let subject"> {{subject.id}} </mat-cell>
          </ng-container>
          <!-- Nombre Column -->
          <ng-container matColumnDef="text">
            <mat-header-cell *matHeaderCellDef> Nombre </mat-header-cell>
            <mat-cell *matCellDef="let subject"> {{subject.text}} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="index">
            <mat-header-cell *matHeaderCellDef> Indice </mat-header-cell>
            <mat-cell *matCellDef="let subject"> {{subject.index}} </mat-cell>
          </ng-container>
          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let subject; columns: displayedColumns;" (click) = openBottomSheet(subject) ></mat-row>
        </mat-table>
      </mat-card>
      <!-- floating-button-->
      <button class="floating-button" mat-fab
      (click)="add()"><mat-icon>add</mat-icon>
      </button>
    </div>
  </div>
  `,
  styleUrls: ['../manage-db.component.css'],
})
export class ReadSubjectComponent implements OnInit, OnDestroy {

  subjects: Subject[] = [];
  subject: Subject;
  displayedColumns = ['text', 'index'];
  subscription: any;

  stateRouterAnimation: string;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private subjectService: SubjectService,
    private router: Router,
    private location: Location,
    private bottomSheet: MatBottomSheet) {
      this.read();
      serviceRouterAnimation.getStateRouterAnimation().subscribe(result => this.stateRouterAnimation = result);
  }

  ngOnInit() {}

  read() {
    this.subscription = this.subjectService.readAll().subscribe(
      (subjects: Subject[]) => {
        this.subjects = subjects;
        this.manageService.setQuantitySubjects(this.subjects.length);
      }
    );
  }

  add() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/alta']);
  }

  openBottomSheet(subject: Subject): void {
    this.manageService.setSubject(subject);
    this.bottomSheet.open(ReadSubjectSheetComponent, {
      data: subject
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
  selector: 'app-read-subject-sheet',
  template: `
    <mat-list>
      <mat-list-item (click)="open()">Secciones de {{subject.text}}</mat-list-item>
      <mat-list-item (click)="update()">Editar {{subject.text}}</mat-list-item>
      <mat-list-item (click)="delete()">Eliminar {{subject.text}}</mat-list-item>
    </mat-list>
  `,
  styleUrls: ['../manage-db.component.css'],
})
export class ReadSubjectSheetComponent {

  subject: Subject;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<ReadSubjectSheetComponent>,
    public dialog: MatDialog,
    private router: Router) {
      this.subject = data;
    }

  open() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/secciones']);
    this.bottomSheetRef.dismiss();
  }

  update() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/cambio']);
    this.bottomSheetRef.dismiss();
  }

  delete() {
    this.dialog.open(DeleteSubjectComponent, {
      data: this.subject
    });
    this.bottomSheetRef.dismiss();
  }
}
