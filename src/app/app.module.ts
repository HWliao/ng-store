import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgStoreService} from 'ng-store';
import {NgAopService} from 'ng-aop';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [NgStoreService, NgAopService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
