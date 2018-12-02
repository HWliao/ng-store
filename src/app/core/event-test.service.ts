import { Injectable } from '@angular/core';
import { EventService } from 'ngsr';

class TestEvent {
  count: number;
}

@Injectable({ providedIn: 'root' })
export class EventTestService {
  constructor(private event: EventService) {
    console.log(1);
    this.event.subscribe(TestEvent, function (e) {
      console.log(3);
      console.log(e);
    });
    console.log(2);
  }

  publish() {
    const event = new TestEvent();
    event.count = 100;
    this.event.publish(event);
  }
}
