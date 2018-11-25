import { Injectable, Type } from '@angular/core';
import { Aspect } from '../../aop';
import { MD_SELECT, MD_STORE, SelectMetadata, StroeMetaData } from '../core/annotation/Store';
import { getModel, ModelMetadata } from '../core/annotation/Model';
import { StoreService } from './store.service';
import { ReducersMapObject } from 'redux';

/**
 * store aspect
 * 对于model进行代理处理
 */
@Injectable({ providedIn: 'root' })
export class StoreAspect implements Aspect {
  /**
   * model元数据
   */
  private metadata: { [key: string]: ModelMetadata } = {};

  constructor(private store: StoreService) { }

  /**
   * 对目标对象进行编织
   * @param target 目标对象
   */
  weave(target: any) {
    const proto = Reflect.getPrototypeOf(target);
    const { constructor } = proto;

    // 检查目标类上的元数据
    const storeMds: StroeMetaData[] = Reflect.getOwnMetadata(MD_STORE, constructor) || [];
    const selectMds: SelectMetadata[] = Reflect.getOwnMetadata(MD_SELECT, constructor) || [];
    // 收集原数据中的model类并进行注册
    this.collectMetadata(storeMds.concat(selectMds));
    // 生成代理store
    // 生成state观察者
    this.store.getState$().pipe();
  }

  private collectMetadata(storeMds: (StroeMetaData | SelectMetadata)[]) {
    let needRelaceReducer = false;
    storeMds.forEach(md => {
      const model = getModel(md.model);
      const name = model.config.name;
      if (!this.metadata[name]) {
        this.metadata[name] = model;
        needRelaceReducer = true;
      }
    });
    if (needRelaceReducer) {
      const reducers: ReducersMapObject = Object.values(this.metadata)
        .reduce((curr, md) => curr[md.config.name] = (md.config.reducer || md.reducer), {});
      this.store.replaceReducer(reducers);
    }
  }
}
