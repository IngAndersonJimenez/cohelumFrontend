import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private isActiveLayoutMemory = new BehaviorSubject(true);
  public isActiveLayoutCurrent = this.isActiveLayoutMemory.asObservable();

  constructor() { }


  activeSectionLayout(status: boolean) {
    this.isActiveLayoutMemory.next(status);
  }


}
