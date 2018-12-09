import { Type } from '@angular/core';
import { DESIGN_PARAMTYPES } from '../../design-metadata';
import { checkArgument } from '../../tools';
import { MD_EVENT_SUB_ADVICE } from '../definitions';

/**
 * 订阅
 */
export function Subscribe(EventType: Type<any>) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    const params: any[] = Reflect.getOwnMetadata(DESIGN_PARAMTYPES, target, propertyKey);
    checkArgument(
      params && params.length === 1 && params[0] === EventType,
      `[event-stream]subscribe method ${propertyKey} 只能有一个参数,且类型必须与订阅类型一致`
    );

    const constructor = target.constructor;
    const ads = Reflect.getOwnMetadata(MD_EVENT_SUB_ADVICE, constructor);

  };
}
