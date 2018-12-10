import { Type } from '@angular/core';
import { DESIGN_PARAMTYPES } from '../../design-metadata';
import { checkArgument, warning } from '../../tools';
import { MD_EVENT_SUB_ADVICE, SubscribeMetadata } from '../definitions';

/**
 * 订阅
 */
export function Subscribe(EventType: Type<any>) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    checkArgument(typeof target[propertyKey] === 'function', `[event-stream]subscribe 标记的${propertyKey}必须为实例方法`);

    const params: any[] = Reflect.getOwnMetadata(DESIGN_PARAMTYPES, target, propertyKey);
    checkArgument(
      params && params.length === 1 && params[0] === EventType,
      `[event-stream]subscribe method ${propertyKey} 只能有一个参数,且类型必须与订阅类型一致`
    );

    const constructor = target.constructor;
    const ads: { [key: string]: SubscribeMetadata } = Reflect.getOwnMetadata(MD_EVENT_SUB_ADVICE, constructor) || {};
    if (ads[<any>EventType]) {
      warning(`[event-stream]subscribe method ${propertyKey} 已经被标记为了订阅者,不能在次标记`);
    } else {
      ads[<any>EventType] = { type: EventType, propertyKey: propertyKey };
      Reflect.defineMetadata(MD_EVENT_SUB_ADVICE, ads, constructor);
    }
  };
}
