import { Inject, Injectable, Optional } from '@angular/core';
import { AnyAction, Store } from 'redux';
import { from, Observable } from 'rxjs';
import { StoreConfig, STORE_CONFIG_TOKEN } from '../core/config/store.config';
import { buildStore } from '../core/store';

/**
 * 封装redux的核心服务
 */
@Injectable({ providedIn: 'root' })
export class StoreService {
  private store: Store<any>;

  constructor(@Optional() @Inject(STORE_CONFIG_TOKEN) config?: StoreConfig) {
    this.store = buildStore(config);
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
   * 注册一个model
   */
  register() {
    // TODO
  }
  /**
   * 销毁一个model
   */
  destroy() {
    // TODO
  }
}
