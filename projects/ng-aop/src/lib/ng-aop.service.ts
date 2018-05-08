import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgAopService {

  constructor() {
  }

  public getStr() {
    return 'aop2';
  }
}
