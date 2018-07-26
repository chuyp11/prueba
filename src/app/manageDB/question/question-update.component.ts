import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManageService } from '../manage-db.service';
import { QuestionService } from '../../shared/services/question.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';
import { Question } from '../../shared/models/question';

@Component({
  selector: 'app-question-update',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Actualizar Pregunta</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Actualizar Pregunta</mat-card-title>
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
export class QuestionUpdateComponent implements OnInit {

  form: FormGroup;
  subject: Subject;
  section: Section;
  questions: Question[];
  question: Question =  { id: '', text: '', index: 0 };
  indexOld: number;
  indexNew: number;
  subscription: any;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private location: Location) {
      this.subject = this.manageService.getSubject();
      this.section = this.manageService.getSection();
      this.question = this.manageService.getQuestion();
      this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      text: [this.question.text, Validators.required],
      index: [this.question.index, Validators.required],
    });
  }

  accept() {
    this.indexOld = this.question.index;
    this.indexNew = +this.form.value.index;
    if (this.indexOld !== this.indexNew) {
      if (this.indexOld > this.indexNew) {
        const tam = this.indexOld - this.indexNew;
        this.subscription = this.questionService.readAll(this.subject, this.section)
          .subscribe((questions: Question[]) => {
            this.questions = questions;
            for (let i = 0; i < tam; i++) {
              this.questions[(this.indexNew - 1)].index += 1;
              this.questionService.update(this.subject, this.section, this.questions[(this.indexNew - 1)]);
              this.indexNew += 1;
              if (i === (tam - 1)) {
                this.subscription.unsubscribe();
                this.updateSubject();
              }
            }
          });
      } else if (this.indexOld < this.indexNew) {
        const tam = this.indexNew - this.indexOld;
        this.subscription = this.questionService.readAll(this.subject, this.section)
          .subscribe((questions: Question[]) => {
            this.questions = questions;
            for (let i = 0; i < (tam); i++) {
              this.questions[(this.indexNew - 1)].index -= 1;
              this.questionService.update(this.subject, this.section, this.questions[(this.indexNew - 1)]);
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
    this.question.text = this.form.value.text;
    this.question.index = +this.form.value.index;
    this.questionService.update(this.subject, this.section, this.question);
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
