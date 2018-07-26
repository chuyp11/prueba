import { Component, Inject } from '@angular/core';

import { ManageService } from '../manage-db.service';
import { AnswerService } from '../../shared/services/answer.service';

import { Subject } from '../../shared/models/subject';
import { Section } from '../../shared/models/section';
import { Question } from '../../shared/models/question';
import { Answer } from '../../shared/models/answer';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-answer-delete',
  template: `
    <h1 mat-dialog-title>Eliminar Respuesta</h1>
    <div mat-dialog-content>
      <p>Seguro que quiere eliminar la respuesta {{Answer.text}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)= cancel()>Cancelar</button>
      <button mat-button (click)= accept() cdkFocusInitial>Eliminar</button>
    </div>
  `,
  styleUrls: [],
  animations: []
})
export class AnswerDeleteComponent {

  subject: Subject;
  section: Section;
  question: Question;
  answers: Answer[];
  answer: Answer =  { id: '', text: '', index: 0 };
  index: number;
  quantityAnswers = 0;
  subscription: any;

  constructor(
    private manageService: ManageService,
    private answerService: AnswerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AnswerDeleteComponent>) {
      this.answer = data;
      this.index = this.answer.index;
      this.subject = this.manageService.getSubject();
      this.section = this.manageService.getSection();
      this.question = this.manageService.getQuestion();
      this.quantityAnswers = this.manageService.getQuantityAnswers();
  }

  cancel() {
    this.dialogRef.close();
  }

  accept() {
    const tam = this.quantityAnswers - this.index;
    this.subscription = this.answerService.readAll(this.subject, this.section, this.question)
      .subscribe((answers: Answer[]) => {
        this.answers = answers;
        for (let i = 0; i < (tam); i++) {
          this.answers[(this.quantityAnswers - 1)].index -= 1;
          this.answerService.update(this.subject, this.section, this.question, this.answers[(this.quantityAnswers - 1)]);
          this.quantityAnswers -= 1;
          if (i === (tam - 1)) {
            this.subscription.unsubscribe();
            this.answerService.delete(this.subject, this.section, this.question, this.answer);
            this.dialogRef.close();
          }
        }
      });
  }
}
