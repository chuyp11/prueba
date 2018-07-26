import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManageService } from '../manage-db.service';
import { SectionService } from '../../shared/services/section.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';

@Component({
  selector: 'app-section-create',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Alta Seccion</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Agregar Seccion</mat-card-title>
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
export class SectionCreateComponent implements OnInit {

  form: FormGroup;
  section: Section =  { id: '', text: '', index: 0, levelEscuela: false, levelSecundaria: false, levelPreparatoria: false,
    levelUniversidad: false, };
  quantitySections = 0;
  subject: Subject;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private sectionService: SectionService,
    private formBuilder: FormBuilder,
    private location: Location) {
      this.quantitySections = this.manageService.getQuantitySections();
      this.subject = this.manageService.getSubject();
      this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
      index: [{value: (this.quantitySections + 1), disabled: true}, Validators.required],
      levelEscuela: [false, Validators.required],
      levelSecundaria: [false, Validators.required],
      levelPreparatoria: [false, Validators.required],
      levelUniversidad: [false, Validators.required],
    });
  }

  accept() {
    this.section.text = this.form.value.text;
    this.section.index = this.quantitySections + 1;
    this.section.levelEscuela = this.form.value.levelEscuela;
    this.section.levelSecundaria = this.form.value.levelSecundaria;
    this.section.levelPreparatoria = this.form.value.levelPreparatoria;
    this.section.levelUniversidad = this.form.value.levelUniversidad;
    this.sectionService.create(this.subject, this.section);
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
