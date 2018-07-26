import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ManageService } from '../manage-db.service';
import { SectionService } from '../../shared/services/section.service';
import { RouterAnimationsService } from '../../shared/services/router-animations.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';

@Component({
  selector: 'app-section-update',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Actualizar Seccion</p>
  </mat-toolbar>
  <div class="contenedor">
    <!-- Card Alta Materias-->
    <mat-card>
      <mat-card-header>
        <mat-card-title>Actualizar Seccion</mat-card-title>
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
export class SectionUpdateComponent implements OnInit {

  form: FormGroup;
  subject: Subject;
  sections: Section[];
  section: Section =  { id: '', text: '', index: 0, levelEscuela: false, levelSecundaria: false, levelPreparatoria: false,
    levelUniversidad: false, };
  indexOld: number;
  indexNew: number;
  subscription: any;

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private manageService: ManageService,
    private sectionService: SectionService,
    private formBuilder: FormBuilder,
    private location: Location) {
      this.subject = this.manageService.getSubject();
      this.section = this.manageService.getSection();
      this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.form = this.formBuilder.group({
      text: [this.section.text, Validators.required],
      index: [this.section.index, Validators.required],
      levelEscuela: [this.section.levelEscuela, Validators.required],
      levelSecundaria: [this.section.levelSecundaria, Validators.required],
      levelPreparatoria: [this.section.levelPreparatoria, Validators.required],
      levelUniversidad: [this.section.levelUniversidad, Validators.required],
    });
  }

  accept() {
    this.indexOld = this.subject.index;
    this.indexNew = +this.form.value.index;
    if (this.indexOld !== this.indexNew) {
      if (this.indexOld > this.indexNew) {
        const tam = this.indexOld - this.indexNew;
        this.subscription = this.sectionService.readAll(this.subject)
          .subscribe((sections: Section[]) => {
            this.sections = sections;
            for (let i = 0; i < tam; i++) {
              this.sections[(this.indexNew - 1)].index += 1;
              this.sectionService.update(this.subject, this.sections[(this.indexNew - 1)]);
              this.indexNew += 1;
              if (i === (tam - 1)) {
                this.subscription.unsubscribe();
                this.updateSubject();
              }
            }
          });
      } else if (this.indexOld < this.indexNew) {
        const tam = this.indexNew - this.indexOld;
        this.subscription = this.sectionService.readAll(this.subject)
          .subscribe((sections: Section[]) => {
            this.sections = sections;
            for (let i = 0; i < (tam); i++) {
              this.sections[(this.indexNew - 1)].index -= 1;
              this.sectionService.update(this.subject, this.sections[(this.indexNew - 1)]);
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
    this.section.text = this.form.value.text;
    this.section.index = +this.form.value.index;
    this.section.levelEscuela = this.form.value.levelEscuela;
    this.section.levelSecundaria = this.form.value.levelSecundaria;
    this.section.levelPreparatoria = this.form.value.levelPreparatoria;
    this.section.levelUniversidad = this.form.value.levelUniversidad;
    this.sectionService.update(this.subject, this.section);
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
