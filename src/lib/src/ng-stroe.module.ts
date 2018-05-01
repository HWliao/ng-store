import { ModuleWithProviders, NgModule } from '@angular/core';
import { StoreOptionsToken, StoreService } from './service/store.service';
import { StoreOptions } from './model/store-options';

@NgModule()
export class NgStoreModule {
  static forRoot(ops: StoreOptions = {}): ModuleWithProviders {
    return {
      ngModule: NgStoreModule,
      providers: [
        { provide: StoreOptionsToken, useValue: ops },
        StoreService
      ]
    };
  }
}
