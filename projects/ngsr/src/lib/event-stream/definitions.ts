import { Type } from '@angular/core';

/**
 * event stream aspect 标识
 */
export const MD_EVENT_ASPECT = '@@[event-stream]aspect';
/**
 * event stream 监听者通知标识
 */
export const MD_EVENT_SUB_ADVICE = '@@[event-stream]subscribes';
/**
 * 订阅者元数据
 */
export interface SubscribeMetadata {
  /**
   * event type class
   */
  event: Type<any>;
  /**
   * 被标记的属性
   */
  propertyKey: string;
}
/**
 * event stream 发布者通知标识
 */
export const MD_EVENT_PUB_ADVICE = '@@[event-stream]publis';
/**
 * 发布者元数据
 */
export interface PublishMetadata {
  propertyKey: string;
}
