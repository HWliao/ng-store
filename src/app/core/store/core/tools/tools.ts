import { combineReducers, Reducer, ReducersMapObject, StoreEnhancer } from 'redux';
import { ReducerEnhancer } from '../config/store.config';

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

export const noop = () => {
};

export const returnSelf = m => m;
