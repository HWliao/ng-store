import { Injectable, Type } from '@angular/core';
import { Aspect } from '../../aop';
import { MD_SELECT, MD_STORE, SelectMetadata, StroeMetaData } from '../core/annotation/Store';
import { StoreService } from './store.service';
import { ReducersMapObject } from 'redux';

/**
 * store aspect
 * 对于model进行代理处理
 */
@Injectable({ providedIn: 'root' })
export class StoreAspect implements Aspect {
  /**
   * 生成reducer的元数据
   */
  private reducerMetadata: ReducersMapObject;

  constructor(private store: StoreService) { }

  /**
   * 对目标对象进行编织
   * @param target 目标对象
   */
  weave(target: any) {
    const proto = Reflect.getPrototypeOf(target);
    const { constructor } = proto;
    // 本次weave需要的model类,需要检查是否在redux注册了reducer
    const needModels: Type<any>[] = [];
    //
    const storeMds: StroeMetaData[] = Reflect.getOwnMetadata(MD_STORE, constructor) || [];
    const selectMds: SelectMetadata[] = Reflect.getOwnMetadata(MD_SELECT, constructor) || [];

    this.store.getState$().pipe();
  }
}
