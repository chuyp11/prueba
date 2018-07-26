import { Component, Inject } from '@angular/core';

import { ManageService } from '../manage-db.service';
import { SubjectService } from '../../shared/services/subject.service';

import { Subject } from '../../shared/models/subject';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-subject',
  template: `
    <h1 mat-dialog-title>Eliminar Materia</h1>
    <div mat-dialog-content>
      <p>Seguro que quiere eliminar la materia {{subject.text}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)= cancel()>Cancelar</button>
      <button mat-button (click)= accept() cdkFocusInitial>Eliminar</button>
  </div>
  `,
  styleUrls: [],
  animations: []
})
export class DeleteSubjectComponent {

  subjects: Subject[];
  subject: Subject =  { id: '', text: '', index: 0, levelEscuela: false, levelSecundaria: false, levelPreparatoria: false,
    levelUniversidad: false, };
  index: number;
  quantitySubjects = 0;
  subscription: any;

  constructor(
    private manageService: ManageService,
    private subjectService: SubjectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteSubjectComponent>) {
      this.subject = data;
      this.index = this.subject.index;
      this.quantitySubjects = this.manageService.getQuantitySubjects();
  }

  cancel() {
    this.dialogRef.close();
  }

  accept() {
    const tam = this.quantitySubjects - this.index;
    this.subscription = this.subjectService.readAll()
      .subscribe((subjects: Subject[]) => {
        this.subjects = subjects;
        for (let i = 0; i < (tam); i++) {
          this.subjects[(this.quantitySubjects - 1)].index -= 1;
          this.subjectService.update(this.subjects[(this.quantitySubjects - 1)]);
          this.quantitySubjects -= 1;
          if (i === (tam - 1)) {
            this.subscription.unsubscribe();
            this.subjectService.delete(this.subject);
            this.dialogRef.close();
          }
        }
      });
  }
}
