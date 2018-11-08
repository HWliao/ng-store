import { Inject, Injectable, Optional } from '@angular/core';
import { defaultStoreConfig, ReducerEnhancer, STORE_CONFIG_TOKEN, StoreConfig } from './store.config';
import { applyMiddleware, combineReducers, compose, createStore, Reducer, ReducersMapObject, Store, StoreEnhancer } from 'redux';
import { returnSelf } from './tools';

@Injectable({ providedIn: 'root' })
export class StoreService {
  /**
   * redux store
   */
  private readonly _store: Store;

  constructor(
    @Inject(STORE_CONFIG_TOKEN) @Optional()
    private readonly storeConfig: StoreConfig
  ) {
    this.storeConfig = Object.assign({}, defaultStoreConfig, this.storeConfig || {});
    this._store = this.storeConfig.store || buildStore(this.storeConfig);
  }
}

/**
 * 构建redux store
 * @param reducerEnhancer reducer增强
 * @param extraReducers 外部输入reducer
 * @param initState 初始state
 * @param middlewares 中间件
 * @param extraEnhancers 外部增强
 * @param devtool 是否开启redux devtool
 */
export function buildStore({ reducerEnhancer, extraReducers, initState, middlewares, extraEnhancers, devtool }: StoreConfig): Store {
  const rootReducer = createReducer({ ...extraReducers, root: (state = false) => state }, reducerEnhancer);
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
  return reducerEnhancer(combineReducers(reducers));
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
