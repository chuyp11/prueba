import { Injectable } from '@angular/core';

import { Subject } from '../shared/models/subject';
import { Section } from '../shared/models/section';
import { Question } from '../shared/models/question';
import { Answer } from '../shared/models/answer';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  private subject = new Subject('', '', 0, false, false, false, false);
  private section = new Section('', '', 0, false, false, false, false);
  private question = new Question('', '', 0);
  private answer = new Answer('', '', 0);

  private quantitySubjects = 0;
  private quantitySections = 0;
  private quantityQuestions = 0;
  private quantityAnswers = 0;

  constructor() {
  }

  // Subject
  getSubject() {
    return this.subject;
  }

  setSubject(subject: Subject) {
    this.subject = subject;
  }

  getQuantitySubjects() {
    return this.quantitySubjects;
  }

  setQuantitySubjects(quantity: number) {
    this.quantitySubjects = quantity;
  }

  // Section
  getSection() {
    return this.section;
  }

  setSection(section: Section) {
    this.section = section;
  }

  getQuantitySections() {
    return this.quantitySections;
  }

  setQuantitySections(quantity: number) {
    this.quantitySections = quantity;
  }

  // Question
  getQuestion() {
    return this.question;
  }

  setQuestion(question: Question) {
    this.question = question;
  }

  getQuantityQuestions() {
    return this.quantityQuestions;
  }

  setQuantityQuestions(quantity: number) {
    this.quantityQuestions = quantity;
  }

  // Answer
  getAnswer() {
    return this.answer;
  }

  setAnswer(answer: Answer) {
    this.answer = answer;
  }

  getQuantityAnswers() {
    return this.quantityAnswers;
  }

  setQuantityAnswers(quantity: number) {
    this.quantityAnswers = quantity;
  }


}
