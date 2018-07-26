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
  selector: 'app-question-create',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Alta Pregunta</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Agregar Pregunta</mat-card-title>
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
export class QuestionCreateComponent implements OnInit {

  form: FormGroup;
  question: Question =  { id: '', text: '', index: 0 };
  quantityQuestion = 0;
  subject: Subject;
  section: Section;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private location: Location) {
      this.quantityQuestion = this.manageService.getQuantityQuestions();
      this.subject = this.manageService.getSubject();
      this.section = this.manageService.getSection();
      this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
      index: [{value: (this.quantityQuestion + 1), disabled: true}, Validators.required],
    });
  }

  accept() {
    this.question.text = this.form.value.text;
    this.question.index = this.quantityQuestion + 1;
    this.questionService.create(this.subject, this.section, this.question);
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
