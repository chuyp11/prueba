import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { ManageService } from '../manage-db.service';
import { AnswerService } from '../../shared/services/answer.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';
import { Question } from '../../shared/models/question';
import { Answer } from '../../shared/models/answer';

import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatDialog } from '@angular/material';

import { AnswerDeleteComponent } from './answer-delete.component';

@Component({
  selector: 'app-answer-read',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Respuestas</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Lectura Materias-->
    <mat-card >
      <mat-table #table [dataSource]="answers">
        <!-- Id Column -->
        <ng-container matColumnDef="id">
          <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
          <mat-cell *matCellDef="let answer"> {{answer.id}} </mat-cell>
        </ng-container>
        <!-- Nombre Column -->
        <ng-container matColumnDef="text">
          <mat-header-cell *matHeaderCellDef> Respuesta </mat-header-cell>
          <mat-cell *matCellDef="let answer"> {{answer.text}} </mat-cell>
        </ng-container>
        <ng-container matColumnDef="index">
          <mat-header-cell *matHeaderCellDef> Indice </mat-header-cell>
          <mat-cell *matCellDef="let answer"> {{answer.index}} </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let answer; columns: displayedColumns;" (click) = openBottomSheet(answer) ></mat-row>
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
export class AnswerReadComponent implements OnInit, OnDestroy {

  answers: Answer[] = [];
  answer: Answer;
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
    private answerService: AnswerService,
    private router: Router,
    private location: Location,
    private bottomSheet: MatBottomSheet) {
      this.subject = this.manageService.getSubject();
      this.section = this.manageService.getSection();
      this.question = this.manageService.getQuestion();
      this.read();
  }

  ngOnInit() {}

  read() {
    this.subscription = this.answerService.readAll(this.subject, this.section, this.question)
      .subscribe((answers: Answer[]) => {
        this.answers = answers;
        this.manageService.setQuantityAnswers(this.answers.length);
      }
    );
  }

  add() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/secciones/preguntas/respuestas/alta']);
  }

  openBottomSheet(answer: Answer): void {
    this.manageService.setAnswer(answer);
    this.bottomSheet.open(AnswerReadSheetComponent, {
      data: answer
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
  selector: 'app-answe-read-sheet',
  template: `
    <mat-list>
      <mat-list-item (click)="update()">Editar {{answer.text}}</mat-list-item>
      <mat-list-item (click)="delete()">Eliminar {{answer.text}}</mat-list-item>
    </mat-list>
  `,
  styleUrls: ['../manage-db.component.css'],
})
export class AnswerReadSheetComponent {

  answer: Answer;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<AnswerReadSheetComponent>,
    public dialog: MatDialog,
    private router: Router) {
      this.answer = data;
  }

  update() {
    this.serviceRouterAnimation.setStateRouterAnimation('next');
    this.router.navigate(['materias/secciones/preguntas/respuestas/cambio']);
    this.bottomSheetRef.dismiss();
  }

  delete() {
    this.dialog.open(AnswerDeleteComponent, {
      data: this.answer
    });
    this.bottomSheetRef.dismiss();
  }
}
