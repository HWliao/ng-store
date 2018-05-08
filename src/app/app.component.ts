import {Component} from '@angular/core';
import {NgStoreService} from 'ng-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(store: NgStoreService) {
    this.title = store.getStr();
  }

  title = 'app';
}
