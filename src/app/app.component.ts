import { Component } from '@angular/core';
import { AnyAction } from 'redux';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModel, AppModelType } from './AppModel';
import { Store, Select, AopService, StoreService } from 'ngsr';

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

  constructor(aop: AopService, private storeService: StoreService) {
    aop.weave(this);
  }

  increase() {
    console.log(this.app);
    this.app.increase();
  }

  change() {
    this.app.setTitle(this.app.title + this.app.title);
  }
}
