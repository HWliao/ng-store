import {Inject, Injectable, InjectionToken} from '@angular/core';
import {applyMiddleware, combineReducers, compose, createStore, Reducer, ReducersMapObject, Store, StoreEnhancer} from 'redux';
import {returnSelf} from '../common/utils';
import {StoreOptions} from '../model/store-options';
import {ReducerEnhancer, State} from '../model/reducer';

/**
 * 配置di标识
 * @type {InjectionToken<any>}
 */
export const StoreOptionsToken = new InjectionToken('@@store-option');

@Injectable()
export class StoreService {

  private readonly _store: Store<State>;

  constructor(@Inject(StoreOptionsToken) ops: StoreOptions = {}) {
    const {
      reducerEnhancer = returnSelf,
      extraReducers = {},
      initState = {},
      middleware = [],
      extraEnhancers = [],
      devtool = true
    } = ops;

    const rootReducer = createReducer({...extraReducers}, reducerEnhancer);

    const enhancers: StoreEnhancer<State>[] = [
      applyMiddleware(...middleware),
      ...extraEnhancers,
      openDevtool(devtool)
    ];

    const enhancer: StoreEnhancer<State> = compose(...enhancers);
    this._store = createStore(rootReducer, initState, enhancer);
  }
}

/**
 * 创建rootReducer
 * @param {ReducerEnhancer} reducerEnhancer
 * @param {ReducersMapObject} reducers
 * @return {Reducer<any>}
 */
function createReducer<S extends State = State>(reducers: ReducersMapObject, reducerEnhancer: ReducerEnhancer<S>): Reducer<S> {
  return reducerEnhancer(combineReducers(reducers));
}

/**
 * 开启redux Devtool
 * @param {boolean} open
 * @return {StoreEnhancer<S>}
 */
function openDevtool<S>(open: boolean): StoreEnhancer<S> {
  if (open && window.__REDUX_DEVTOOLS_EXTENSION__) {
    return window.__REDUX_DEVTOOLS_EXTENSION__(window.__REDUX_DEVTOOLS_EXTENSION__OPTIONS);
  }
  return returnSelf;
}
