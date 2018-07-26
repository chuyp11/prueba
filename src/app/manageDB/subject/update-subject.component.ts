import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManageService } from '../manage-db.service';
import { SubjectService } from '../../shared/services/subject.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';

@Component({
  selector: 'app-update-subject',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Actualizar Materia</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Actualizar Materia</mat-card-title>
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
          [disabled]="form.invalid">Actualizar</button>
      </mat-card-actions>
    </mat-card>
  </div>
  `,
  styleUrls: ['../manage-db.component.css'],
  animations: []
})
export class UpdateSubjectComponent implements OnInit {

  form: FormGroup;
  subjects: Subject[];
  subject: Subject =  { id: '', text: '', index: 0, levelEscuela: false, levelSecundaria: false, levelPreparatoria: false,
    levelUniversidad: false, };
  indexOld: number;
  indexNew: number;
  subscription: any;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private subjectService: SubjectService,
    private formBuilder: FormBuilder,
    private location: Location) {
      this.subject = this.manageService.getSubject();
      this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      text: [this.subject.text, Validators.required],
      index: [this.subject.index, Validators.required],
      levelEscuela: [this.subject.levelEscuela, Validators.required],
      levelSecundaria: [this.subject.levelSecundaria, Validators.required],
      levelPreparatoria: [this.subject.levelPreparatoria, Validators.required],
      levelUniversidad: [this.subject.levelUniversidad, Validators.required],
    });
  }

  accept() {
    this.indexOld = this.subject.index;
    this.indexNew = +this.form.value.index;
    if (this.indexOld !== this.indexNew) {
      if (this.indexOld > this.indexNew) {
        const tam = this.indexOld - this.indexNew;
        this.subscription = this.subjectService.readAll()
          .subscribe((subjects: Subject[]) => {
            this.subjects = subjects;
            for (let i = 0; i < tam; i++) {
              this.subjects[(this.indexNew - 1)].index += 1;
              this.subjectService.update(this.subjects[(this.indexNew - 1)]);
              this.indexNew += 1;
              if (i === (tam - 1)) {
                this.subscription.unsubscribe();
                this.updateSubject();
              }
            }
          });
      } else if (this.indexOld < this.indexNew) {
        const tam = this.indexNew - this.indexOld;
        this.subscription = this.subjectService.readAll()
          .subscribe((subjects: Subject[]) => {
            this.subjects = subjects;
            for (let i = 0; i < (tam); i++) {
              this.subjects[(this.indexNew - 1)].index -= 1;
              this.subjectService.update(this.subjects[(this.indexNew - 1)]);
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
    this.subject.text = this.form.value.text;
    this.subject.index = +this.form.value.index;
    this.subject.levelEscuela = this.form.value.levelEscuela;
    this.subject.levelSecundaria = this.form.value.levelSecundaria;
    this.subject.levelPreparatoria = this.form.value.levelPreparatoria;
    this.subject.levelUniversidad = this.form.value.levelUniversidad;
    this.subjectService.update(this.subject);
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
