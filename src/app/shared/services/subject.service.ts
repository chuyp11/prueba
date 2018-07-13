import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  subjectCollection: AngularFirestoreCollection<Subject>;
  subjectDoc: AngularFirestoreDocument<Subject>;
  subjects: Observable<Subject[]>;
  subject: Observable<Subject>;

  constructor(private afs: AngularFirestore) {
  }

  create(subject: Subject) {
    this.subjectCollection = this.afs.collection<Subject>('subjects');
    const id = this.afs.createId();
    subject.id = id;
    this.subjectCollection.doc(id).set(subject);
  }

  readAll(): Observable<Subject[]> {
    this.subjectCollection = this.afs.collection<Subject>('subjects', ref => ref.orderBy('sequence'));
    this.subjects = this.subjectCollection.valueChanges();
    return this.subjects;
  }

  read(id: string): Observable<Subject> {
    this.subjectDoc = this.afs.doc<Subject>(`subjects/${id}`);
    this.subject = this.subjectDoc.valueChanges();
    return this.subject;
  }

  update(subject: Subject) {
    this.subjectDoc = this.afs.doc<Subject>(`subjects/${subject.id}`);
    this.subjectDoc.update(subject);
  }

  delete(subject: Subject) {
    this.subjectDoc = this.afs.doc<Subject>(`subjects/${subject.id}`);
    this.subjectDoc.delete();
  }

}
