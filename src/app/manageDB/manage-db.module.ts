import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateSubjectComponent } from './subject/create-subject.component';
import { DeleteSubjectComponent } from './subject/delete-subject.component';
import { ReadSubjectComponent } from './subject/read-subject.component';
import { ReadSubjectSheetComponent } from './subject/read-subject.component';
import { UpdateSubjectComponent } from './subject/update-subject.component';

import { SectionCreateComponent } from './section/section-create.component';
import { SectionDeleteComponent } from './section/section-delete.component';
import { SectionReadComponent } from './section/section-read.component';
import { SectionReadSheetComponent } from './section/section-read.component';
import { SectionUpdateComponent } from './section/section-update.component';

import { QuestionCreateComponent } from './question/question-create.component';
import { QuestionDeleteComponent } from './question/question-delete.component';
import { QuestionReadComponent } from './question/question-read.component';
import { QuestionReadSheetComponent } from './question/question-read.component';
import { QuestionUpdateComponent } from './question/question-update.component';

import { AnswerCreateComponent } from './answer/answer-create.component';
import { AnswerDeleteComponent } from './answer/answer-delete.component';
import { AnswerReadComponent } from './answer/answer-read.component';
import { AnswerReadSheetComponent } from './answer/answer-read.component';
import { AnswerUpdateComponent } from './answer/answer-update.component';

import { ManageDBRoutingModule } from './manage-db-routing.module';

import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ManageDBRoutingModule,
  ],
  declarations: [
    CreateSubjectComponent,
    DeleteSubjectComponent,
    ReadSubjectComponent,
    ReadSubjectSheetComponent,
    UpdateSubjectComponent,
    SectionCreateComponent,
    SectionDeleteComponent,
    SectionReadComponent,
    SectionReadSheetComponent,
    SectionUpdateComponent,
    QuestionCreateComponent,
    QuestionDeleteComponent,
    QuestionReadComponent,
    QuestionReadSheetComponent,
    QuestionUpdateComponent,
    AnswerCreateComponent,
    AnswerDeleteComponent,
    AnswerReadComponent,
    AnswerReadSheetComponent,
    AnswerUpdateComponent,
  ],
  entryComponents: [
    DeleteSubjectComponent,
    ReadSubjectSheetComponent,
    SectionDeleteComponent,
    SectionReadSheetComponent,
    QuestionDeleteComponent,
    QuestionReadSheetComponent,
    AnswerDeleteComponent,
    AnswerReadSheetComponent,
  ],
})
export class ManageDBModule {}
