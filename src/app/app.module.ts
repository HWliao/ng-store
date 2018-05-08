import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgStoreModule, NgStoreService} from 'ng-store';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgStoreModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
