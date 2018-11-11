import { Component } from '@angular/core';
import { StoreService } from './core/store/service/store.service';

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
  }

  increase() {
    this.count += 1;
  }

  change() {
    this.title = this.title + this.count;
  }
}
