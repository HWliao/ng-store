import { Aspect } from '../../aop';
import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

/**
 * store aspect
 * 对于model进行代理处理
 */
@Injectable({ providedIn: 'root' })
export class StoreAspect implements Aspect {
  constructor(private store: StoreService) { }

  /**
   * 对目标对象尽心编织
   * @param target 目标对象
   */
  weave(target: any) {
    throw new Error('Method not implemented.');
  }
}
