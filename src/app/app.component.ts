import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { RouterAnimationsService } from './shared/services/router-animations.service';

import { slideRight, slideLeft } from './shared/animations/router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideRight, slideLeft ],
})

export class AppComponent {

  stateRouterAnimation: string;

  stateOld = '';
  stateNew = '';
  tem = '';
  state = '';

  constructor(
    private serviceRouterAnimation: RouterAnimationsService) {
      serviceRouterAnimation.getStateRouterAnimation().subscribe(result => this.stateRouterAnimation = result);
      console.log(this.stateRouterAnimation);
  }

  // getState(outlet) {
  //   return outlet.activatedRouteData.state;
  // }

  getStateLeft(outlet) {
    if (this.stateRouterAnimation === 'next') {
        return outlet.activatedRouteData.state;
    }
    return null;
  }

  getStateRight(outlet) {
    if (this.stateRouterAnimation === 'back') {
        return outlet.activatedRouteData.state;
    }
    return null;
  }

}
