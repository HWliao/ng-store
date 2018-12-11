import { Injectable, OnDestroy } from '@angular/core';
import { AopService, Publish, Store, Subscribe } from 'ngsr';
import { AppModel } from '../AppModel';

class TestEvent {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class EventTestService implements OnDestroy {

  @Store(AppModel)
  private app: AppModel;

  constructor(aop: AopService) {
    aop.weave(this);
  }

  @Publish(TestEvent)
  publish(): TestEvent {
    const event = new TestEvent();
    event.count = 100;
    return event;
  }

  @Subscribe(TestEvent)
  sub(e: TestEvent) {
    this.app.setCount(e.count);
  }

  ngOnDestroy() { }
}
