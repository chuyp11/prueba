import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { SubjectService } from '../shared/services/subject.service';
import { SectionService } from '../shared/services/section.service';
import { PracticeService } from './practice.service';

import { Subject } from '../shared/models/subject';
import { Section } from '../shared/models/section';

import { trigger, state, style, animate, transition
} from '@angular/animations';


@Component({
  selector: 'app-practice-select',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Seleccionar</p>
  </mat-toolbar>
  <!-- Card Lectura Materias-->
  <mat-tab-group (selectedIndexChange)="changeIndex($event)" color="accent" backgroundColor="primary" >
    <mat-tab *ngFor="let subject of subjects; let j=index" label="{{subject.text}}">
      <div class="contenedor">
      <mat-card>
          <mat-table #table [dataSource]= "sections[j]">
            <!-- Id Column -->
            <ng-container matColumnDef="id">
              <mat-header-cell *matHeaderCellDef> Id </mat-header-cell>
              <mat-cell *matCellDef="let sections"> {{sections.id}} </mat-cell>
            </ng-container>
            <!-- Nombre Column -->
            <ng-container matColumnDef="text">
              <mat-header-cell *matHeaderCellDef> Nombre </mat-header-cell>
              <mat-cell *matCellDef="let sections"> {{sections.text}} </mat-cell>
            </ng-container>
            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let sections; columns: displayedColumns;" (click) = practicar(sections) ></mat-row>
          </mat-table>
        </mat-card>
      </div>
    </mat-tab>
  </mat-tab-group>7
  `,
  styleUrls: ['./practice.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class PracticeSelectComponent implements OnInit, OnDestroy {

  subjects: Subject[] = [];
  sections: Section[][] = [];

  subscriptionSubjects: any;
  subscriptionSections: any;

  displayedColumns = ['text'];

  indexSubject: number;

  constructor(
    private subjectService: SubjectService,
    private sectionService: SectionService,
    private practiceService: PracticeService,
    private location: Location) {
      this.read();
  }

  ngOnInit() {}

  read() {
    this.subscriptionSubjects = this.subjectService.readAll()
      .subscribe((subjects: Subject[]) => {
        this.subjects = subjects;
        // console.log(this.subjects);
        for (let i = 0; i < subjects.length; i++) {
          this.subscriptionSections = this.sectionService.readAll(this.subjects[i])
            .subscribe((sections: Section[]) => {
              this.sections[i] = sections;
              // console.log(this.sections[i]);
            });
        }
      });
    this.subscriptionSubjects.unsubscribe();
    this.subscriptionSections.unsubscribe();
  }

  changeIndex(index: number) {
    this.indexSubject = index;
  }

  back() {
    this.location.back();
  }

  ngOnDestroy() {

  }
}
