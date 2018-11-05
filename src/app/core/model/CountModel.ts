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


class Test {
  s1 = '';

  f() {
  }
}

class Tx extends Test {
  static s1 = '';
  static f = '';
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

interface Constructor<T> {
  new(...args: any[]): T;
}

function wrapperModelFactory<T extends object>(model: T): { new(): T } & { [k in keyof T]?: string } {
  class Xxx {
  }

  Xxx.prototype = model;
  const keys = Object.keys(model);
  keys.forEach(key => Xxx[key] = key);

  return <Constructor<T> & { [k in keyof T]?: string }>Xxx;
}

const x = wrapperModelFactory(new Test());
(<any>window).Test = x;
console.log(x.f);
console.log(x.s1);
console.log(new x());
