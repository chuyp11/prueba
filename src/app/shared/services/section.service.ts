import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Subject } from '../models/subject';
import { Section } from '../models/section';


@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  sectionCollection: AngularFirestoreCollection<Section>;
  sectionDoc: AngularFirestoreDocument<Section>;
  sections: Observable<Section[]>;
  section: Observable<Section>;

  subject: Subject;

  constructor(private afs: AngularFirestore) {
  }

  create(subject: Subject, section: Section) {
    this.sectionCollection = this.afs.collection<Section>(`subjects/${subject.id}/sections`);
    const id = this.afs.createId();
    section.id = id;
    this.sectionCollection.doc(id).set(section);
  }

  readAll(subject: Subject): Observable<Section[]> {
    this.sectionCollection = this.afs.collection<Section>(`subjects/${subject.id}/sections`, ref => ref.orderBy('sequence'));
    this.sections = this.sectionCollection.valueChanges();
    return this.sections;
  }

  read(subject: Subject, id: string): Observable<Section> {
    this.sectionDoc = this.afs.doc<Section>(`subjects/${subject.id}/sections/${id}`);
    this.section = this.sectionDoc.valueChanges();
    return this.section;
  }

  update(subject: Subject, section: Section) {
    this.sectionDoc = this.afs.doc<Section>(`subjects/${subject.id}/sections/${section.id}`);
    this.sectionDoc.update(section);
  }

  delete(subject: Subject, section: Section) {
    this.sectionDoc = this.afs.doc<Section>(`subjects/${subject.id}/sections/${section.id}`);
    this.sectionDoc.delete();
  }

}
