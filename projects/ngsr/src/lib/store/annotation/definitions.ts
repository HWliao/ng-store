import { InjectionToken, Type } from '@angular/core';
import { AnyAction, Reducer } from 'redux';
import { registerPointcut } from '../../aop/aop.service';

/**
 * 元数据中store的标记
 */
export const MD_STORE = '@@[redux]store';
/**
 * store 元数据接口
 */
export interface StroeMetaData {
  propertyKey: string;
  model: Type<any>;
}


/**
 * 元数据中selec的标记
 */
export const MD_SELECT = '@@[redux]select';
/**
 * select 元数据
 */
export interface SelectMetadata {
  propertyKey: string;
  model: Type<any>;
  key?: string;
}


/**
 * store aspect 标识
 */
export const MD_ASPECT_STORE = '@@[redux]store aspect';
/**
 * 注册redux pointcut
 * @param target 目标对象
 * @param aspect 处理aspect service
 */
export function registerReduxPointcut(target: Type<any>, aspect: Type<any> | InjectionToken<any>) {
  return registerPointcut(target, MD_ASPECT_STORE, aspect);
}

/**
 * model类的元数据标识
 */
export const MD_MODEL_TOKEN = '@@[redux]model';
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

/**
 * model元数据
 */
export interface ModelMetadata {
  /**
   * model 配置
   */
  config: ModelConfig;
  /**
   * model对应的reducer
   */
  reducer: Reducer;
  /**
   * 创建action
   */
  createAction: (actinType: string, args: any[]) => AnyAction;
  /**
   * state key
   */
  stateKeys: string[];
  /**
   * action key
   */
  actionKeys: string[];
}
/**
 * 标记参数
 */
export interface ModelConfig {
  /**
   * model 名称，必须唯一
   */
  name: string;
  /**
   * 自定义reduer
   */
  reducer?: Reducer;
  /**
   * 自定义action构造函数
   */
  createAction?: (actinType: string, args: any[]) => AnyAction;
  [key: string]: any;
}
