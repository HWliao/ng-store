import { Type } from '@angular/core';
import { StroeMetaData, MD_STORE, registerReduxPointcut } from './definitions';
import { warning, getConstructor } from '../../tools';
import { StoreAspect } from '../service/store-aspect.service';

/**
 * 标记property为某个model的代理
 * @param model model类
 */
export function Store(model: Type<any>) {
  return function (target: any, propertyKey: string) {
    const { constructor } = target;
    const mds: StroeMetaData[] = Reflect.getOwnMetadata(MD_STORE, constructor) || [];
    if (mds.find(md => md.propertyKey === propertyKey)) {
      warning(`[redux]propertyKey ${propertyKey} 已经有一个store的标记了`);
    } else {
      mds.push({ propertyKey, model });
      Reflect.defineMetadata(MD_STORE, mds, constructor);
      registerReduxPointcut(constructor, StoreAspect);
    }
  };
}
