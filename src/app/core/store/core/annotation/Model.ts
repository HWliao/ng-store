import { Type, TypeDecorator } from '@angular/core';
import { warning } from '../tools/tools';
import { DESIGN_PARAMTYPES } from './Design';
/**
 * 元数据中model标识
 */
export const MD_MODEL_TOKEN = '@@[redux]model';

export const DEFUALT_MODEL: ModelConfig = { name: '' };

/**
 * Model注解
 * @param model model配置
 */
export function Model(modelConfig: ModelConfig | string) {
  if (typeof modelConfig === 'string') {
    modelConfig = { name: modelConfig };
  }
  modelConfig = Object.assign({}, DEFUALT_MODEL, modelConfig);

  return (Target: Type<any>) => {
    const params = Reflect.getOwnMetadata(DESIGN_PARAMTYPES, Target);
    if (params) {
      // 目标类 构造器 不能有参数
      warning('model 类构造函数不能有参数！');
    }
    // 将model配置绑定到目标类上
    Reflect.defineMetadata(MD_MODEL_TOKEN, modelConfig, Target);
    // hack 在目标类上hack出state key和action type标识
    const target = new Target();
    // state keys 都是在直接存在实例对象之上属性，在初始化过程中被赋予了初始值
    const stateKeys = Reflect.ownKeys(target);
    stateKeys.forEach(key => Reflect.defineProperty(Target, key, { get: () => key, enumerable: true }));
    // action/reducer 存在于原型对象上的函数

  };
}
/**
 * 转换model类的类型
 * @param c 目标model类
 */
export function HackType<T>(c: Type<T>): { [key in keyof T]: StateKeyType<T> } {
  return <Type<T> & { [key in keyof T]: StateKeyType<T> }>c;
}

/**
 * 标记参数
 */
export interface ModelConfig {
  /**
   * model 名称，必须唯一
   */
  name: string;
  [key: string]: any;
}

/**
 * model被hack之后对应的state key type接口
 */
export interface StateKeyType<T> {
  /**
   * 对应model类
   */
  model: Type<T>;
  /**
   * model类中的property key
   */
  key?: string;
}
