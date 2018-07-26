import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterAnimationsService {

  private stateRouterAnimation = new BehaviorSubject('forward');

  constructor() {
  }

  getStateRouterAnimation(): Observable<string> {
    return this.stateRouterAnimation.asObservable();
  }

  setStateRouterAnimation(state: string) {
    this.stateRouterAnimation.next(state);
  }

}
