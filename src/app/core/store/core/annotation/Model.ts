import { Type } from '@angular/core';
import { produce } from 'immer';
import { AnyAction, Reducer } from 'redux';
import { warning } from '../tools/tools';
import { DESIGN_PARAMTYPES } from './Design';

/**
 * 用来检查model name是否唯一
 */
const modelNameMap = {};

/**
 * 元数据中model标识
 */
export const MD_MODEL_TOKEN = '@@[redux]model';

/**
 * Model注解
 * @param model model配置
 */
export function Model(config: ModelConfig | string) {
  if (typeof config === 'string') {
    config = { name: config };
  }
  if (!config.name || config.name.trim() === '') {
    throw new Error('model name 不能为null/undefined/空字符串');
  }
  if (modelNameMap[config.name]) {
    throw new Error(`model name ${config.name} 已经存在了`);
  }
  if ((!config.reducer && config.createAction) || (config.reducer && !config.createAction)) {
    throw new Error('自定义 reducer和createAction必须同时存在或者不存在!');
  }
  config = <ModelConfig>Object.assign({}, config);

  return (Target: Type<any>) => {
    const params = Reflect.getOwnMetadata(DESIGN_PARAMTYPES, Target);
    if (params && params.length > 0) {
      // 目标类 构造器 不能有参数
      warning('model 类构造函数不能有参数！');
    }

    // hack 在目标类上hack出state key和action type标识
    const target = new Target();
    // state keys 都是在直接存在实例对象之上属性，在初始化过程中被赋予了初始值
    const stateKeys = <string[]>Reflect.ownKeys(target).filter(key => typeof key === 'string');
    const initState = stateKeys.reduce((curr, key) => {
      curr[key] = target[key];
      return curr;
    }, {});
    stateKeys.forEach(key => Reflect.defineProperty(Target, key, { get: () => ({ key: key, model: Target }), enumerable: true }));
    // action/reducer 存在于原型对象上的函数
    const actionReducers = {};
    const actionKeys: string[] = [];
    let proto = Reflect.getPrototypeOf(target);
    while (proto && Reflect.getPrototypeOf(proto)) {
      Reflect.ownKeys(proto).forEach(key => {
        if (typeof key !== 'string') {
          return;
        }
        if (key === 'contructor') {
          // contructor属性过滤掉
          return;
        }
        if (initState[key]) {
          // prototype上的属性在构造器中重新初始化了,将导致其作为state
          return;
        }
        if (typeof target[key] !== 'function') {
          // action key对应的值必须为函数
          return;
        }
        if (actionReducers[key]) {
          // 子类中的action覆盖掉父类的action
          return;
        }
        // 记录action对应的reducer处理函数
        actionKeys.push(key);
        const actionKey = `${(<ModelConfig>config).name}.${key}`;
        actionReducers[actionKey] = target[key];
        // 在Target上hack出action type
        Reflect.defineProperty(Target, key, { get: () => actionKey, enumerable: true });
      });
      proto = Reflect.getPrototypeOf(proto);
    }

    // action的type为前面创建的type
    // action的payload为一个参数列表
    const createAction: (actinType: string, args: any[]) => AnyAction = (type: string, payload: any[]) => ({ type, payload });
    // 构建reducer 这是一个默认reducer 需要借助immer进行值得处理
    // 注意这里并没有使用initState作为初始值,在计算过程需要用到target内部的方法
    const reducer: Reducer = (state = initState, action: AnyAction) => {
      if (action && actionReducers[action.type]) {
        const actionReducer = actionReducers[action.type];
        return produce(state, draftState => {
          Reflect.apply(actionReducer, draftState, action.payload);
        });
      }
      return state;
    };

    const modelMd: ModelMetadata = {
      config: <ModelConfig>config,
      reducer: reducer,
      createAction: createAction,
      stateKeys,
      actionKeys
    };
    // 将model配置绑定到目标类上
    Reflect.defineMetadata(MD_MODEL_TOKEN, modelMd, Target);
  };
}
/**
 * 从model中获取model元数据
 * @param model model类
 */
export function getModel(model: Type<any>): ModelMetadata {
  return Reflect.getOwnMetadata(MD_MODEL_TOKEN, model);
}
/**
 * 转换model类的类型
 * @param c 目标model类
 */
export function HackType<T>(c: Type<T>): Type<T> & { [key in keyof T]: StateKeyType<T> } {
  return <Type<T> & { [key in keyof T]: StateKeyType<T> }>c;
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
