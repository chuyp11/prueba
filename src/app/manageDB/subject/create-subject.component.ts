import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManageService } from '../manage-db.service';
import { SubjectService } from '../../shared/services/subject.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';

@Component({
  selector: 'app-create-subject',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Alta Materia</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Agregar Materia</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="form" class="form">
          <mat-form-field >
            <input matInput placeholder="Nombre" formControlName="text">
          </mat-form-field>
          <mat-form-field >
            <input matInput placeholder="Indice" formControlName="index">
          </mat-form-field>
          <div class="checkbox-group">
            <mat-checkbox class="checkbox" formControlName="levelEscuela">Escuela</mat-checkbox>
            <mat-checkbox class="checkbox" formControlName="levelSecundaria">Secundaria</mat-checkbox>
            <mat-checkbox class="checkbox" formControlName="levelPreparatoria">Preparatoria</mat-checkbox>
            <mat-checkbox class="checkbox" formControlName="levelUniversidad">Universidad</mat-checkbox>
          </div>
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
export class CreateSubjectComponent implements OnInit {

  form: FormGroup;
  subject: Subject =  { id: '', text: '', index: 0, levelEscuela: false, levelSecundaria: false, levelPreparatoria: false,
    levelUniversidad: false, };
  quantitySubjects = 0;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private location: Location) {
      this.quantitySubjects = this.manageService.getQuantitySubjects();
      this.createForm();
  }

  ngOnInit() {}
  createForm() {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
      index: [{value: (this.quantitySubjects + 1), disabled: true}, Validators.required],
      levelEscuela: [false, Validators.required],
      levelSecundaria: [false, Validators.required],
      levelPreparatoria: [false, Validators.required],
      levelUniversidad: [false, Validators.required],
    });
  }

  accept() {
    this.subject.text = this.form.value.text;
    this.subject.index = this.quantitySubjects + 1;
    this.subject.levelEscuela = this.form.value.levelEscuela;
    this.subject.levelSecundaria = this.form.value.levelSecundaria;
    this.subject.levelPreparatoria = this.form.value.levelPreparatoria;
    this.subject.levelUniversidad = this.form.value.levelUniversidad;
    console.log(this.subject);
    this.subjectService.create(this.subject);
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
