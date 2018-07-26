import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ManageService } from '../manage-db.service';
import { QuestionService } from '../../shared/services/question.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';
import { Question } from '../../shared/models/question';

import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog } from '@angular/material';

import { QuestionDeleteComponent } from './question-delete.component';

@Component({
  selector: 'app-question-read',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Preguntas</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Lectura Materias-->
    <mat-card >
      <mat-table #table [dataSource]="questions">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
          <mat-cell *matCellDef="let question"> {{question.id}} </mat-cell>
        </ng-container>
        <!-- Nombre Column -->
        <ng-container matColumnDef="text">
          <mat-header-cell *matHeaderCellDef> Pregunta </mat-header-cell>
          <mat-cell *matCellDef="let question"> {{question.text}} </mat-cell>
        </ng-container>
        <ng-container matColumnDef="index">
          <mat-header-cell *matHeaderCellDef> Indice </mat-header-cell>
          <mat-cell *matCellDef="let question"> {{question.index}} </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let question; columns: displayedColumns;" (click) = openBottomSheet(question) ></mat-row>
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
export class QuestionReadComponent implements OnInit, OnDestroy {

  questions: Question[] = [];
  question: Question;
  sections: Section[] = [];
  section: Section;
  subjects: Subject[] = [];
  subject: Subject;
  displayedColumns = ['text', 'index'];
  subscription: any;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private questionService: QuestionService,
    private router: Router,
    private location: Location,
    private bottomSheet: MatBottomSheet) {
      this.subject = this.manageService.getSubject();
      this.section = this.manageService.getSection();
      this.read();
  }

  ngOnInit() {}

  read() {
    this.subscription = this.questionService.readAll(this.subject, this.section)
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.manageService.setQuantityQuestions(this.questions.length);
      }
    );
  }

  add() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/secciones/preguntas/alta']);
  }

  openBottomSheet(question: Question): void {
    this.manageService.setQuestion(question);
    this.bottomSheet.open(QuestionReadSheetComponent, {
      data: question
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
  selector: 'app-question-read-sheet',
  template: `
    <mat-list>
      <mat-list-item (click)="open()">Respuestas de {{question.text}}</mat-list-item>
      <mat-list-item (click)="update()">Editar {{question.text}}</mat-list-item>
      <mat-list-item (click)="delete()">Eliminar {{question.text}}</mat-list-item>
    </mat-list>
  `,
  styleUrls: ['../manage-db.component.css'],
})
export class QuestionReadSheetComponent {

  question: Question;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<QuestionReadSheetComponent>,
    public dialog: MatDialog,
    private router: Router) {
      this.question = data;
  }

  open() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/secciones/preguntas/respuestas']);
    this.bottomSheetRef.dismiss();
  }

  update() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/secciones/preguntas/cambio']);
    this.bottomSheetRef.dismiss();
  }

  delete() {
    this.dialog.open(QuestionDeleteComponent, {
      data: this.question
    });
    this.bottomSheetRef.dismiss();
  }
}
