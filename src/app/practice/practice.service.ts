import { Injectable } from '@angular/core';

import { Subject } from '../shared/models/subject';
import { Section } from '../shared/models/section';
import { Question } from '../shared/models/question';
import { Answer } from '../shared/models/answer';

import { SubjectService } from '../shared/services/subject.service';
import { SectionService } from '../shared/services/section.service';


@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  private subject: Subject;
  private section: Section;
  private questions: Question[] = [];
  private answers: Answer[][] = [];

  constructor() {
  }

  setParameters(subject: Subject, section: Section) {
    this.subject = subject;
    this.section = section;
    this.loadData();
  }

  loadData() {

  }

}
