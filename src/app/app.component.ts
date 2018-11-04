import { Component } from '@angular/core';
import { WrapperModel } from './core/model/CountModel';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-store';
  count = 0;

  constructor(model: WrapperModel) {
    console.log(model);
  }

  increase() {
    this.count += 1;
  }
}
