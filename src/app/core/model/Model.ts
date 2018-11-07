import { Injectable } from '@angular/core';

export interface Constructor<T> {
  new(...args: any[]): T;
}

export function Modular<T extends Object>() {
  return function ModularDecorator(C: Constructor<T>) {
    class Model {
      constructor() {
      }
    }

    const name = C.name;
    const c = new C();
    const prototype = Reflect.getPrototypeOf(c);

    Model.prototype = c;
    [].concat(Object.keys(c), Object.keys(prototype))
      .forEach(key => Model[key] = `${name}.${key}`);

    return <M<T>>Model;
  };
}

export type M<T> = Constructor<T> & { [key in keyof T]?: string };

export function CM<T>(C: Constructor<T>) {
  return <M<T>>C;
}
