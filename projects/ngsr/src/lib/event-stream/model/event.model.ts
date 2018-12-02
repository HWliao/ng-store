import { Model, HackType } from '../../store/annotation/model.annotation';

/**
 * 事件队列model
 */
@Model('@@[event-stream]')
export class EventModel {
  /**
   * 事件描述
   */
  event = {};

  /**
   * 发布事件
   * @param event 事件
   */
  publish(event: any) {
    this.event = event;
  }
}

export const EventModelHack = HackType(EventModel);
