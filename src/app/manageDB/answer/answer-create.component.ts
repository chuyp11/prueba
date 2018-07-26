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
  selector: 'app-answer-create',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Alta Respuesta</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Agregar Respuesta</mat-card-title>
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
          [disabled]="form.invalid">Agregar</button>
      </mat-card-actions>
    </mat-card>
  </div>
  `,
  styleUrls: ['../manage-db.component.css'],
  animations: []
})
export class AnswerCreateComponent implements OnInit {

  form: FormGroup;
  answer: Answer =  { id: '', text: '', index: 0 };
  quantityAnswers = 0;
  subject: Subject;
  section: Section;
  question: Question;


  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private answerService: AnswerService,
    private formBuilder: FormBuilder,
    private location: Location) {
      this.quantityAnswers = this.manageService.getQuantityAnswers();
      this.subject = this.manageService.getSubject();
      this.section = this.manageService.getSection();
      this.question = this.manageService.getQuestion();
      this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
      index: [{value: (this.quantityAnswers + 1), disabled: true}, Validators.required],
    });
  }

  accept() {
    this.answer.text = this.form.value.text;
    this.answer.index = this.quantityAnswers + 1;
    this.answerService.create(this.subject, this.section, this.question, this.answer);
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
