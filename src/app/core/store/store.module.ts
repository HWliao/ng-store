import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreConfig } from './core/config/store.config';
import { buildStore } from './core/store';
import { StoreService } from './service/store.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StoreModule {
  static forRoot(config?: StoreConfig): ModuleWithProviders {
    buildStore(config);
    return {
      ngModule: StoreModule,
      providers: [
        { provide: StoreService, useClass: StoreService }
      ]
    };
  }
}
