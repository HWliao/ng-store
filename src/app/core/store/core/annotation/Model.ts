import { Constructor } from '../tools/types';
import { TypeDecorator, Type } from '@angular/core';
import { DESIGN_PARAMTYPES } from './Design';
import { warning } from '../tools/tools';
/**
 * 元数据中model标识
 */
export const MD_MODEL_TOKEN = '@@model';

export const DEFUALT_MODEL: Model = { name: '' };

/**
 * Model注解
 * @param model model配置
 */
export const ModelDecorator: ModelDecorator = (model: Model | string) => {
  if (typeof model === 'string') {
    model = { name: model };
  }
  model = Object.assign({}, DEFUALT_MODEL, model);

  return (Target: Type<any>) => {
    const params = Reflect.getOwnMetadata(DESIGN_PARAMTYPES, Target);
    if (params) {
      // 目标类 构造器 不能有参数
      warning('model 类构造函数不能有参数！');
    }
    // 将model配置绑定到目标类上
    Reflect.defineMetadata(MD_MODEL_TOKEN, model, Target);
    // hack 在目标类上hack出state key和action type标识
    const target = new Target();
    // state keys 都是在直接存在实例对象之上属性，在初始化过程中被赋予了初始值
    const stateKeys = Reflect.ownKeys(target);
    stateKeys.forEach(key => Reflect.defineProperty(Target, key, { get: () => key, enumerable: true }));
    // action/reducer 存在于原型对象上的函数

  };
};
export function HackType<T>(c: Type<T>): { [key in keyof T]: string } {
  return <Type<T> & { [key in keyof T]: string }>c;
}
/**
 * 在model类上进行标记
 */
export type ModelDecorator = (model: Model | string) => TypeDecorator;
/**
 * 标记参数
 */
export interface Model {
  /**
   * model 名称，必须唯一
   */
  name: string;
  [key: string]: any;
}

export declare const Model: ModelDecorator;
