import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManageService } from '../manage-db.service';
import { AnswerService } from '../../shared/services/answer.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';
import { Question } from '../../shared/models/question';
import { Answer } from '../../shared/models/answer';

@Component({
  selector: 'app-answer-update',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Actualizar Respuesta</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Actualizar Respuesta</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form" class="form">
          <mat-form-field >
            <input matInput placeholder="Nombre" formControlName="text">
          </mat-form-field>
          <mat-form-field >
            <input matInput placeholder="Indice" formControlName="index">
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button class="boton" (click)= cancel()>Cancelar</button>
        <button mat-raised-button color="primary" (click)= accept()
          [disabled]="form.invalid">Actualizar</button>
      </mat-card-actions>
    </mat-card>
  </div>
  `,
  styleUrls: ['../manage-db.component.css'],
  animations: []
})
export class AnswerUpdateComponent implements OnInit {

  form: FormGroup;
  subject: Subject;
  section: Section;
  question: Question;
  answers: Answer[];
  answer: Answer =  { id: '', text: '', index: 0 };
  indexOld: number;
  indexNew: number;
  subscription: any;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,
    private location: Location) {
      this.subject = this.manageService.getSubject();
      this.section = this.manageService.getSection();
      this.question = this.manageService.getQuestion();
      this.answer = this.manageService.getAnswer();
      this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      text: [this.answer.text, Validators.required],
      index: [this.answer.index, Validators.required],
    });
  }

  accept() {
    this.indexOld = this.answer.index;
    this.indexNew = +this.form.value.index;
    if (this.indexOld !== this.indexNew) {
      if (this.indexOld > this.indexNew) {
        const tam = this.indexOld - this.indexNew;
        this.subscription = this.answerService.readAll(this.subject, this.section, this.question)
          .subscribe((answers: Answer[]) => {
            this.answers = answers;
            for (let i = 0; i < tam; i++) {
              this.answers[(this.indexNew - 1)].index += 1;
              this.answerService.update(this.subject, this.section, this.question, this.answers[(this.indexNew - 1)]);
              this.indexNew += 1;
              if (i === (tam - 1)) {
                this.subscription.unsubscribe();
                this.updateSubject();
              }
            }
          });
      } else if (this.indexOld < this.indexNew) {
        const tam = this.indexNew - this.indexOld;
        this.subscription = this.answerService.readAll(this.subject, this.section, this.question)
          .subscribe((answers: Answer[]) => {
            this.answers = answers;
            for (let i = 0; i < (tam); i++) {
              this.answers[(this.indexNew - 1)].index -= 1;
              this.answerService.update(this.subject, this.section, this.question, this.answers[(this.indexNew - 1)]);
              this.indexNew -= 1;
              if (i === (tam - 1)) {
                this.subscription.unsubscribe();
                this.updateSubject();
              }
            }
          });
      }
    } else {
      this.updateSubject();
    }
  }

  updateSubject() {
    this.answer.text = this.form.value.text;
    this.answer.index = +this.form.value.index;
    this.answerService.update(this.subject, this.section, this.question, this.answer);
    this.back();
  }

  cancel() {
    this.back();
  }

  back() {
    this.serviceRouterAnimation.setStateRouterAnimation('back');
    this.location.back();
  }
}
