import { Component } from '@angular/core';
import { StoreService } from './core/store/service/store.service';
import { AppModel, AppModelType } from './AppModel';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-store';

  count = 0;

  constructor(private storeService: StoreService) {
    this.storeService.connect(this);
    const app = new AppModel();
    console.log(Object.keys(AppModelType));
    console.log(Object.keys(app));
  }

  increase() {
    this.count += 1;
  }

  change() {
    this.title = this.title + this.count;
  }
}
