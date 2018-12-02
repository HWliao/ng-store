import { Component } from '@angular/core';
import { AopService, Select, Store } from 'ngsr';
import { Observable } from 'rxjs';
import { AppModel, AppModelType } from './AppModel';
import { EventTestService } from './core/event-test.service';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Store(AppModel)
  app: AppModel;

  @Select(AppModelType.title)
  title$: Observable<string>;

  constructor(
    aop: AopService,
    private eventService: EventTestService
  ) {
    aop.weave(this);
  }

  increase() {
    console.log(this.app);
    this.app.increase();
  }

  change() {
    this.app.setTitle(this.app.title + this.app.title);
  }
  publish() {
    this.eventService.publish();
  }
}
