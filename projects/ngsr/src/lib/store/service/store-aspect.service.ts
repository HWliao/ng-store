import { Injectable } from '@angular/core';
import { ReducersMapObject } from 'redux';
import { distinctUntilChanged, map, share } from 'rxjs/operators';
import { Aspect } from '../../aop/aop.service';
import { getConstructor, warning } from '../../tools';
import { MD_SELECT, MD_STORE, ModelMetadata, SelectMetadata, StroeMetaData } from '../annotation/definitions';
import { getModel } from '../annotation/model.annotation';
import { StoreService } from './store.service';

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
    const constructor = getConstructor(target);

    // 检查目标类上的元数据
    const storeMds: StroeMetaData[] = Reflect.getOwnMetadata(MD_STORE, constructor) || [];
    const selectMds: SelectMetadata[] = Reflect.getOwnMetadata(MD_SELECT, constructor) || [];
    // 收集原数据中的model类并进行注册
    this.collectMetadata(storeMds.concat(selectMds));
    // 生成代理store
    storeMds.forEach(this.createStoreProxy(target));
    // 生成state观察者
    selectMds.forEach(this.createSelectProxy(target));
  }

  /**
   * 根据select 元数据在目标对象生成select观察者对象
   * @param target 目标对象
   */
  private createSelectProxy(target: any) {
    return (selectMd: SelectMetadata) => {
      const propertyKey = selectMd.propertyKey;
      const stateKey = selectMd.key;
      const model = getModel(selectMd.model);
      const modelName = model.config.name;
      const proxy$ = this.store.getState$().pipe(
        distinctUntilChanged(),
        map(state => state[modelName]),
        map(modelState => stateKey ? modelState[stateKey] : modelState),
        distinctUntilChanged(),
        share()
      );
      Reflect.defineProperty(target, propertyKey, {
        set: () => { warning(`[redux]model ${modelName} select ${propertyKey} ${stateKey} 不支持直接赋值`); },
        get: () => proxy$,
        enumerable: true
      });
    };
  }

  /**
   * 根据store 元数据在目标对象上生成store model代理
   * @param target 目标元素
   */
  private createStoreProxy(target: any) {
    return (storeMd: StroeMetaData) => {
      const propertyKey = storeMd.propertyKey;
      const model = getModel(storeMd.model);
      const proxy = {};
      const modelName = model.config.name;
      const createAction = model.config.createAction || model.createAction;

      model.stateKeys.forEach(stateKey => {
        Reflect.defineProperty(proxy, stateKey, {
          set: (v: any) => { warning(`[redux]model ${modelName} store proxy ${propertyKey} ${stateKey} 不支持直接修改`); },
          get: () => this.store.getState()[modelName][stateKey],
          enumerable: true
        });
      });
      model.actionKeys.forEach(actionKey => {
        Reflect.defineProperty(proxy, actionKey, {
          set: () => { warning(`[redux]model ${modelName} store proxy ${propertyKey} ${actionKey} 不支持修改`); },
          get: () => (...args: any[]) => this.store.dispatch(createAction(`${modelName}.${actionKey}`, args)),
          enumerable: true
        });
      });

      Reflect.defineProperty(target, propertyKey, {
        get: () => proxy,
        enumerable: true
      });
    };
  }
  /**
   * 搜集目标对象上的元数据,并注册reducers
   * @param mds 元数据
   */
  private collectMetadata(mds: (StroeMetaData | SelectMetadata)[]) {
    let needRelaceReducer = false;
    mds.forEach(md => {
      const model = getModel(md.model);
      const name = model.config.name;
      if (!this.metadata[name]) {
        this.metadata[name] = model;
        needRelaceReducer = true;
      }
    });
    if (needRelaceReducer) {
      const reducers: ReducersMapObject = Object.values(this.metadata)
        .reduce((curr, md) => {
          curr[md.config.name] = (md.config.reducer || md.reducer);
          return curr;
        }, {});
      this.store.replaceReducer(reducers);
    }
  }
}
