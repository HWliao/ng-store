import { Component } from '@angular/core';
import { CountModel } from './core/model/CountModel';
import { CM } from './core/model/Model';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-store';
  count = 0;

  constructor(model: CountModel) {
    console.log(model);
    console.log(CM(CountModel).increase);
    console.log(CM(CountModel).count);
  }

  increase() {
    this.count += 1;
  }
}
