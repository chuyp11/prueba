import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { RouterAnimationsService } from '../../shared/services/router-animations.service';

@Component({
  selector: 'app-template',
  template: `
  <mat-toolbar class="toolbar" color="primary">
    <mat-icon class="toolbarIcono" (click)= back()>arrow_back</mat-icon>
    <p class="toolbarTitulo">Practicar 1</p>
  </mat-toolbar>
  <div class="contenedor">

  </div>
  `,
  styleUrls: [],
  animations: []
})
export class TemplateComponent implements OnInit {

  constructor(
    private serviceRouterAnimation: RouterAnimationsService,
    private location: Location) {
  }

  ngOnInit() {}

  back() {
    this.serviceRouterAnimation.setStateRouterAnimation('back');
    this.location.back();
  }
}
