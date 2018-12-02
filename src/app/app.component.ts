import { Component } from '@angular/core';
import { AnyAction } from 'redux';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel, AppModelType } from './AppModel';
import { Store, Select, AopService, StoreService } from 'ngsr';
import { EventService } from 'projects/ngsr/src';
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
    private storeService: StoreService,
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
