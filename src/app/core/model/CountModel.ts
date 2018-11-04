import { Injectable, OnDestroy } from '@angular/core';
import { StoreService } from '../service/store.service';

export class CountModel {
  constructor() {

  }

  private count = 0;

  increase() {
    this.count += 1;
  }
}

@Injectable({ providedIn: 'root' })
export class WrapperModel extends CountModel implements OnDestroy {

  constructor(store: StoreService) {
    super();
    const prototype = Reflect.getPrototypeOf(this);
    Reflect.defineProperty(prototype.constructor, 'name', {
      value: 'CountModel'
    });
    console.log(prototype);
    console.log(Reflect.ownKeys(this));
    const anies = Reflect.enumerate(this);
    Object.keys(this);
  }

  ngOnDestroy(): void {
  }
}
