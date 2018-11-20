import { Type } from '@angular/core';
import { warning } from '../tools/tools';
import { registerPointcut } from 'src/app/core/aop';
import { StoreAspect } from '../../service/store.aspect';

/**
 * 元数据中store的标记
 */
export const MD_STORE = '@@[redux]store';
/**
 * 注册redux pointcut
 * @param target 目标对象
 */
export function registerReduxPointcut(target: Type<any>) {
  return registerPointcut(target, '@@[redux]store aspect', StoreAspect);
}

/**
 * store 元数据接口
 */
export interface StroeMetaData {
  propertyKey: string;
  model: Type<any>;
}
/**
 * 标记property为某个model的代理
 * @param model model类
 */
export function Store(model: Type<any>) {
  return function (target: any, propertyKey: string) {
    const { constructor } = target;
    const mds: StroeMetaData[] = Reflect.getOwnMetadata(MD_STORE, constructor) || [];
    if (mds.find(md => md.propertyKey === propertyKey)) {
      warning(`propertyKey ${propertyKey} 已经有一个store的标记了`);
    } else {
      mds.push({ propertyKey, model });
      Reflect.defineMetadata(MD_STORE, mds, constructor);
      registerReduxPointcut(constructor);
    }
  };
}
/**
 * 从redux的store中监听某个
 * @param stateKey 指定一个state的key 可以给当一个model类或者指定一个model的“属性标识”
 */
export function Select(stateKey: any) {
  return function (target: any, propertyKey: string) {
    // todo
  };
}
