import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Subject } from '../models/subject';
import { Section } from '../models/section';
import { Question } from '../models/question';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  questionCollection: AngularFirestoreCollection<Question>;
  questionDoc: AngularFirestoreDocument<Question>;
  questions: Observable<Question[]>;
  question: Observable<Question>;

  subject: Subject;
  section: Section;

  constructor(private afs: AngularFirestore) {
  }

  create(subject: Subject, section: Section, question: Question ) {
    this.questionCollection = this.afs.collection<Question>(`subjects/${subject.id}/sections/${section.id}/questions`);
    const id = this.afs.createId();
    question.id = id;
    this.questionCollection.doc(id).set(question);
  }

  readAll(subject: Subject, section: Section): Observable<Question[]> {
    this.questionCollection = this.afs.collection<Question>
      (`subjects/${subject.id}/sections/${section.id}/questions`, ref => ref.orderBy('index'));
    this.questions = this.questionCollection.valueChanges();
    return this.questions;
  }

  read(subject: Subject, section: Section, id: string): Observable<Question> {
    this.questionDoc = this.afs.doc<Question>(`subjects/${subject.id}/sections/${section.id}/questions/${id}`);
    this.question = this.questionDoc.valueChanges();
    return this.question;
  }

  update(subject: Subject, section: Section, question: Question) {
    this.questionDoc = this.afs.doc<Question>(`subjects/${subject.id}/sections/${section.id}/questions/${question.id}`);
    this.questionDoc.update(question);
  }

  delete(subject: Subject, section: Section, question: Question) {
    this.questionDoc = this.afs.doc<Question>(`subjects/${subject.id}/sections/${section.id}/questions/${question.id}`);
    this.questionDoc.delete();
  }

}
