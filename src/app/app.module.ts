import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgStoreModule} from 'ng-store';
import {AppNavComponent} from './app-nav/app-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppDashComponent} from './app-dash/app-dash.component';
import {AppTableComponent} from './app-table/app-table.component';

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    AppDashComponent,
    AppTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgStoreModule.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
