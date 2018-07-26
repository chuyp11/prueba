import { Component, Inject } from '@angular/core';

import { ManageService } from '../manage-db.service';
import { QuestionService } from '../../shared/services/question.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';
import { Question } from '../../shared/models/question';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-question-delete',
  template: `
    <h1 mat-dialog-title>Eliminar Pregunta</h1>
    <div mat-dialog-content>
      <p>Seguro que quiere eliminar la pregunta {{question.text}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)= cancel()>Cancelar</button>
      <button mat-button (click)= accept() cdkFocusInitial>Eliminar</button>
    </div>
  `,
  styleUrls: [],
  animations: []
})
export class QuestionDeleteComponent {

  subject: Subject;
  section: Section;
  questions: Question[];
  question: Question =  { id: '', text: '', index: 0 };
  index: number;
  quantityQuestions = 0;
  subscription: any;

  constructor(
    private manageService: ManageService,
    private questionService: QuestionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QuestionDeleteComponent>) {
      this.question = data;
      this.index = this.question.index;
      this.subject = this.manageService.getSubject();
      this.section = this.manageService.getSection();
      this.quantityQuestions = this.manageService.getQuantityQuestions();
  }

  cancel() {
    this.dialogRef.close();
  }

  accept() {
    const tam = this.quantityQuestions - this.index;
    this.subscription = this.questionService.readAll(this.subject, this.section)
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        for (let i = 0; i < (tam); i++) {
          this.questions[(this.quantityQuestions - 1)].index -= 1;
          this.questionService.update(this.subject, this.section, this.questions[(this.quantityQuestions - 1)]);
          this.quantityQuestions -= 1;
          if (i === (tam - 1)) {
            this.subscription.unsubscribe();
            this.questionService.delete(this.subject, this.section, this.question);
            this.dialogRef.close();
          }
        }
      });
  }
}
