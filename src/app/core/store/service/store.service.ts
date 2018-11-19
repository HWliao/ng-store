import { Inject, Injectable, Optional } from '@angular/core';
import { AnyAction, Store, Reducer, ReducersMapObject } from 'redux';
import { from, Observable } from 'rxjs';
import { StoreConfig, STORE_CONFIG_TOKEN, defaultStoreConfig } from '../core/config/store.config';
import { buildStore, createReducer } from '../core/store';

/**
 * 封装redux的核心服务
 */
@Injectable({ providedIn: 'root' })
export class StoreService {
  private store: Store<any>;
  private config: StoreConfig;

  constructor(@Optional() @Inject(STORE_CONFIG_TOKEN) config?: StoreConfig) {
    this.config = Object.assign({}, defaultStoreConfig, config || {});
    this.store = buildStore(this.config);
  }
  /**
   * 获取整个state快照
   */
  getState(): any {
    return this.store.getState();
  }
  /**
   * 获取state observable
   */
  getState$(): Observable<any> {
    return from(<any>this.store);
  }
  /**
   * 发布一个redux action
   * @param action redux action
   */
  dispatch(action: AnyAction): void {
    this.store.dispatch(action);
  }
  /**
   * 动态替换reducer
   * @param nextReducer next reducer
   */
  replaceReducer(reducerMap: ReducersMapObject) {
    const nextReducer = createReducer({ ...this.config.extraReducers, ...reducerMap }, this.config.reducerEnhancer);
    this.store.replaceReducer(nextReducer);
  }
}
