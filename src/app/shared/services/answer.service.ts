import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Subject } from '../models/subject';
import { Section } from '../models/section';
import { Question } from '../models/question';
import { Answer } from '../models/answer';


@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  answerCollection: AngularFirestoreCollection<Question>;
  answerDoc: AngularFirestoreDocument<Question>;
  answers: Observable<Question[]>;
  answer: Observable<Question>;

  subject: Subject;
  section: Section;
  question: Question;

  constructor(private afs: AngularFirestore) {
  }

  create(subject: Subject, section: Section, question: Question, answer: Answer ) {
    this.answerCollection = this.afs.collection<Answer>(`subjects/${subject.id}/sections/${section.id}/questions/${question.id}/answers`);
    const id = this.afs.createId();
    answer.id = id;
    this.answerCollection.doc(id).set(answer);
  }

  readAll(subject: Subject, section: Section, question: Question): Observable<Answer[]> {
    this.answerCollection = this.afs.collection<Answer>
      (`subjects/${subject.id}/sections/${section.id}/questions/${question.id}/answers`, ref => ref.orderBy('sequence'));
    this.answers = this.answerCollection.valueChanges();
    return this.answers;
  }

  read(subject: Subject, section: Section, question: Question, id: string): Observable<Answer> {
    this.answerDoc = this.afs.doc<Answer>(`subjects/${subject.id}/sections/${section.id}/questions/${question.id}/answers/${id}`);
    this.answer = this.answerDoc.valueChanges();
    return this.answer;
  }

  update(subject: Subject, section: Section, question: Question, answer: Answer) {
    this.answerDoc = this.afs.doc<Answer>(`subjects/${subject.id}/sections/${section.id}/questions/${question.id}/answers/${answer.id}`);
    this.answerDoc.update(answer);
  }

  delete(subject: Subject, section: Section, question: Question, answer: Answer) {
    this.answerDoc = this.afs.doc<Answer>(`subjects/${subject.id}/sections/${section.id}/questions/${question.id}/answers/${answer.id}`);
    this.answerDoc.delete();
  }

}
