import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Select } from '../../store/annotation/selelct.annotation';
import { Store } from '../../store/annotation/store.annotation';
import { getConstructor, warning } from '../../tools';
import { EventModel, EventModelHack } from '../model/event.model';
import { AopService } from '../../aop/aop.service';

@Injectable({ providedIn: 'root' })
export class EventService {

  @Store(EventModel)
  private event: EventModel;
  @Select(EventModelHack)
  private event$: Observable<EventModel>;

  private subscriptions = {};
  constructor(aop: AopService) {
    aop.weave(this);
  }

  /**
   * 发布事件
   * @param event 事件
   */
  publish(event: any) {
    this.event.publish(event);
  }
  /**
   * 根据事件类型和处理函数进行订阅
   * @param type 事件类型
   * @param handler 处理函数
   */
  subscribe(type: Type<any>, handler: (event: any) => void) {
    const theType = <any>type;
    if (this.subscriptions[theType] && this.subscriptions[theType][handler]) {
      // 同一个事件类型,同一个处理函数只能订阅一次
      warning(`[event-stream]type ${type} handler ${handler} 已经订阅了,不能再次订阅.`);
      return;
    }
    const subscription = this.event$
      .pipe(
        map(event => event.event),
        filter(event => event && (getConstructor(event) === type))
      )
      .subscribe(handler);
    this.subscriptions[theType] = this.subscriptions[theType] || {};
    this.subscriptions[theType][handler] = subscription;
  }
  /**
   * 取消订阅
   * @param type 事件类型
   * @param handler 处理函数
   */
  unsubscribe(type: Type<any>, handler: Function) {
    const theType = <any>type;
    if (this.subscriptions[theType] && this.subscriptions[theType][handler]) {
      this.subscriptions[theType][handler].unsubscribe();
      this.subscriptions[theType][handler] = undefined;
    }
  }
}
