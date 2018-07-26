import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateSubjectComponent } from './subject/create-subject.component';
import { ReadSubjectComponent } from './subject/read-subject.component';
import { UpdateSubjectComponent } from './subject/update-subject.component';

import { SectionCreateComponent } from './section/section-create.component';
import { SectionReadComponent } from './section/section-read.component';
import { SectionUpdateComponent } from './section/section-update.component';

import { QuestionCreateComponent } from './question/question-create.component';
import { QuestionReadComponent } from './question/question-read.component';
import { QuestionUpdateComponent } from './question/question-update.component';

import { AnswerCreateComponent } from './answer/answer-create.component';
import { AnswerReadComponent } from './answer/answer-read.component';
import { AnswerUpdateComponent } from './answer/answer-update.component';

const Routes: Routes = [
  { path: 'materias', component: ReadSubjectComponent, data: { state: 'materias' } },
  { path: 'materias/alta', component: CreateSubjectComponent, data: { state: 'materias-alta' } },
  { path: 'materias/cambio', component: UpdateSubjectComponent, data: { state: 'materias-cambio' } },
  { path: 'materias/secciones', component: SectionReadComponent, data: { state: 'secciones' } },
  { path: 'materias/secciones/alta', component: SectionCreateComponent, data: { state: 'secciones-alta' } },
  { path: 'materias/secciones/cambio', component: SectionUpdateComponent, data: { state: 'secciones-cambio' } },
  { path: 'materias/secciones/preguntas', component: QuestionReadComponent, data: { state: 'preguntas' } },
  { path: 'materias/secciones/preguntas/alta', component: QuestionCreateComponent, data: { state: 'preguntas-alta' } },
  { path: 'materias/secciones/preguntas/cambio', component: QuestionUpdateComponent, data: { state: 'preguntas-cambio' } },
  { path: 'materias/secciones/preguntas/respuestas', component: AnswerReadComponent, data: { state: 'respuestas' } },
  { path: 'materias/secciones/preguntas/respuestas/alta', component: AnswerCreateComponent, data: { state: 'respuestas-alta' } },
  { path: 'materias/secciones/preguntas/respuestas/cambio', component: AnswerUpdateComponent, data: { state: 'respuestas-cambio' } },
];

@NgModule({
  imports: [
    RouterModule.forChild(Routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ManageDBRoutingModule {}
