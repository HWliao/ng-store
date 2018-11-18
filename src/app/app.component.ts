import { Component } from '@angular/core';
import { AopService } from './core/aop';
import { TestField, TestMethod } from './core/aop-test.service';
import { StoreService } from './core/store/service/store.service';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @TestField()
  title = 'ng-store';

  count = 0;

  state1 = '';

  state2$: Observable<any>;

  constructor(aop: AopService, private storeService: StoreService) {
    aop.weave(this);
    // private storeService: StoreService
    // this.storeService.connect(this);
    // const app = new AppModel();
    // console.log(Object.keys(AppModelType));
    // console.log(Object.keys(app));
    this.state2$ = this.storeService.getState$().pipe(
      map(state => state.testlhw)
    );
  }

  @TestMethod()
  increase() {
    this.count += 1;
  }

  change() {
    this.title = this.title + this.count;
  }

  storeClick() {
    this.state1 = this.storeService.getState().testlhw;
    this.storeService.dispatch({ type: 'testlhw', payload: `${this.title}.${this.count}` });
  }
}
