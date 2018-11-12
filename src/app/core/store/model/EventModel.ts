import { Model } from '../core/annotation/Model';

/**
 * Event Model
 * 用于处理事件流
 */
@Model('@@event')
export class EventModel {

  /**
   * 给定一个空的事件对象
   */
  event: Event | null = null;

  /**
   * 发布事件
   * @param event 事件
   */
  publish(event: Event) {
    this.event = event;
  }
}

export interface Event {
  type: string;
  data?: any;
}
