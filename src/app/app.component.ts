import {Component} from '@angular/core';
import {NgStoreService} from 'ng-store';
import {NgAopService} from 'ng-aop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(store: NgStoreService, aop: NgAopService) {
    this.title = store.getStr() + aop.getStr();
  }

  title = 'app';
}
