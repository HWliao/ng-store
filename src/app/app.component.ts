import { Component } from '@angular/core';

@Component({
  selector: 'ns-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-store';

  count = 0;

  constructor() {
  }

  increase() {
    this.count += 1;
  }

  change() {
    this.title = this.title + this.count;
  }
}
