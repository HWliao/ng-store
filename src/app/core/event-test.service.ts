import { Injectable } from '@angular/core';
import { EventService, Store, AopService } from 'ngsr';
import { AppModel } from '../AppModel';

class TestEvent {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class EventTestService {

  @Store(AppModel)
  private app: AppModel;

  constructor(aop: AopService, private event: EventService) {
    aop.weave(this);

    this.event.subscribe(TestEvent, (e) => {
      this.app.setCount(e.count);
    });
  }

  publish() {
    const event = new TestEvent();
    event.count = 100;
    this.event.publish(event);
  }
}
