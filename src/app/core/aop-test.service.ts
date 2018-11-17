import { Injectable } from '@angular/core';
import { Aspect, registerPointcut } from './aop/aop.service';


const MD_TEST_AOP = 'test aop';

export function TestField() {
  return function (target: any, propertyKey: string) {
    const constructor = target.constructor;
    const md = Reflect.getOwnMetadata(MD_TEST_AOP, constructor) || {};
    const fields = md.fields || [];
    fields.push(propertyKey);
    md.fields = fields;
    Reflect.defineMetadata(MD_TEST_AOP, md, constructor);
    registerPointcut(constructor, 'test', AopTestService);
  };
}

export function TestMethod() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const constructor = target.constructor;
    const md = Reflect.getOwnMetadata(MD_TEST_AOP, constructor) || {};
    const methods = md.methods || [];
    methods.push(propertyKey);
    md.methods = methods;
    Reflect.defineMetadata(MD_TEST_AOP, md, constructor);
    registerPointcut(constructor, 'test', AopTestService);
  };
}

@Injectable()
export class AopTestService implements Aspect {
  constructor() { }

  weave(target: any) {
    console.log('test weave');
    const { constructor } = Reflect.getPrototypeOf(target);
    const md = Reflect.getOwnMetadata(MD_TEST_AOP, constructor);
    const fields = md.fields || [];
    const methods = md.methods || [];
    fields.forEach(function (field) {
      let count = target[field];
      Reflect.defineProperty(target, field, {
        set: function (c: number) {
          count = c;
          console.log(`${field} set ${c}`);
        },
        get: function () {
          console.log(`${field} get ${count}`);
          return count;
        }
      });
    });
    methods.forEach(function (method) {
      let fn = target[method];
      Reflect.defineProperty(target, method, {
        get: function () {
          return function (...args: any[]) {
            console.log(`${method} get call`);
            return Reflect.apply(fn, target, args);
          };
        },
        set: function (tmpfn) {
          console.log(`${method} set call`);
          fn = tmpfn;
        }
      });
    });

  }
}
