import { Component, Inject } from '@angular/core';

import { ManageService } from '../manage-db.service';
import { SectionService } from '../../shared/services/section.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-section-delete',
  template: `
    <h1 mat-dialog-title>Eliminar Seccion</h1>
    <div mat-dialog-content>
      <p>Seguro que quiere eliminar la seccion {{section.text}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)= cancel()>Cancelar</button>
      <button mat-button (click)= accept() cdkFocusInitial>Eliminar</button>
    </div>
  `,
  styleUrls: [],
  animations: []
})
export class SectionDeleteComponent {

  subject: Subject;
  sections: Section[];
  section: Section =  { id: '', text: '', index: 0, levelEscuela: false, levelSecundaria: false, levelPreparatoria: false,
    levelUniversidad: false, };
  index: number;
  quantitySections = 0;
  subscription: any;

  constructor(
    private manageService: ManageService,
    private sectionService: SectionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SectionDeleteComponent>) {
      this.section = data;
      this.index = this.section.index;
      this.subject = this.manageService.getSubject();
      this.quantitySections = this.manageService.getQuantitySections();
  }

  cancel() {
    this.dialogRef.close();
  }

  accept() {
    const tam = this.quantitySections - this.index;
    this.subscription = this.sectionService.readAll(this.subject)
      .subscribe((sections: Section[]) => {
        this.sections = sections;
        for (let i = 0; i < (tam); i++) {
          this.sections[(this.quantitySections - 1)].index -= 1;
          this.sectionService.update(this.subject, this.sections[(this.quantitySections - 1)]);
          this.quantitySections -= 1;
          if (i === (tam - 1)) {
            this.subscription.unsubscribe();
            this.sectionService.delete(this.subject, this.section);
            this.dialogRef.close();
          }
        }
      });
  }
}
