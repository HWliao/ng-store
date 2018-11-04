import { Middleware, Reducer, ReducersMapObject, StoreEnhancer } from 'redux';
import { InjectionToken } from '@angular/core';
import { returnSelf } from './tools';


/**
 * reducer增强函数
 */
export type ReducerEnhancer<S = any> = (reducer: Reducer<S>) => Reducer<S>;

/**
 * store 配置接口
 */
export interface StoreConfig {
  /**
   * root reducer 增强
   */
  reducerEnhancer?: ReducerEnhancer;
  /**
   * 额外的reducer
   * 使用redux 函数式的方式扩充store中reducer
   * 用于不支持自动扫描的场景,加入reducer
   */
  extraReducers?: ReducersMapObject;
  /**
   * 初始状态
   */
  initState?: any;
  /**
   * redux中间件
   */
  middlewares?: Middleware[];
  /**
   * 额外的reduxstore增强函数
   */
  extraEnhancers?: StoreEnhancer[];
  /**
   * 是否开启redux devtool
   */
  devtool?: boolean;

  [key: string]: any;
}

/**
 * 默认配置
 */
export const defaultStoreConfig: StoreConfig = {
  reducerEnhancer: returnSelf,
  extraReducers: {},
  initState: {},
  middlewares: [],
  extraEnhancers: [],
  devtool: true
};

/**
 * store config token
 */
export const STORE_CONFIG_TOKEN = new InjectionToken<StoreConfig>('@@store-config');
