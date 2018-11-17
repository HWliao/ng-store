import { Component } from '@angular/core';
import { StoreService } from './core/store/service/store.service';
import { AppModel, AppModelType } from './AppModel';
import { AopTestService, TestField, TestMethod } from './core/aop-test.service';
import { AopService } from './core/aop';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @TestField()
  title = 'ng-store';

  count = 0;

  constructor(aop: AopService) {
    aop.weave(this);
    // private storeService: StoreService
    // this.storeService.connect(this);
    // const app = new AppModel();
    // console.log(Object.keys(AppModelType));
    // console.log(Object.keys(app));
  }

  @TestMethod()
  increase() {
    this.count += 1;
  }

  change() {
    this.title = this.title + this.count;
  }
}
