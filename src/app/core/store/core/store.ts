import { applyMiddleware, compose, createStore, Store, StoreEnhancer } from 'redux';
import { defaultStoreConfig, StoreConfig } from './config/store.config';
import { createReducer, openDevtool } from './tools/tools';

/**
 * redux store
 */
let store: Store;
/**
 * model 元数据
 */
const metadata: { [key: string]: any } = {};

/**
 * 注册model
 */
export function registered() {
  // TODO
}
/**
 * 销毁model
 */
export function destroy() {
  // TODO
}
/**
 * 构建redux store
 * @param config store 配置
 */
export function buildStore(config: StoreConfig = {}): Store {
  if (!store) {
    config = Object.assign({}, defaultStoreConfig, config);
    const { reducerEnhancer, extraReducers, initState, middlewares, extraEnhancers, devtool } = config;
    const rootReducer = createReducer({ ...extraReducers }, reducerEnhancer);
    const enhancers: StoreEnhancer[] = [applyMiddleware(...middlewares), ...extraEnhancers, openDevtool(devtool)];
    const enhancer: StoreEnhancer = compose(...enhancers);
    store = createStore(rootReducer, initState, enhancer);
  }
  return store;
}
