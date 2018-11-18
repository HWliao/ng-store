import { applyMiddleware, compose, createStore, Store, StoreEnhancer, ReducersMapObject, combineReducers, Reducer } from 'redux';
import { defaultStoreConfig, StoreConfig, ReducerEnhancer } from './config/store.config';
import { returnSelf } from './tools/tools';

/**
 * 构建redux store
 * @param config store 配置
 */
export function buildStore(config: StoreConfig = {}): Store {
  config = Object.assign({}, defaultStoreConfig, config);
  const { reducerEnhancer, extraReducers, initState, middlewares, extraEnhancers, devtool } = config;
  const rootReducer = createReducer({ ...extraReducers }, reducerEnhancer);
  const enhancers: StoreEnhancer[] = [applyMiddleware(...middlewares), ...extraEnhancers, openDevtool(devtool)];
  const enhancer: StoreEnhancer = compose(...enhancers);
  return createStore(rootReducer, initState, enhancer);
}
/**
 * 创建root reducer
 * @param reducers reducers
 * @param reducerEnhancer 增强
 */
export function createReducer(reducers: ReducersMapObject, reducerEnhancer: ReducerEnhancer): Reducer {
  const rootReducer = combineReducers(reducers) || ((state = {}) => state);
  return reducerEnhancer(rootReducer);
}

/**
 * 开启redux devtool
 * @param open 是否开启
 */
export function openDevtool(open: boolean): StoreEnhancer {
  if (open && (<any>window).__REDUX_DEVTOOLS_EXTENSION__) {
    return (<any>window).__REDUX_DEVTOOLS_EXTENSION__((<any>window).__REDUX_DEVTOOLS_EXTENSION__OPTIONS);
  }
  return returnSelf;
}
