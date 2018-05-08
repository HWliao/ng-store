import {ModuleWithProviders, NgModule} from '@angular/core';
import {defaultOptions, StoreOptionsToken} from './service/store-options.service';
import {StoreOptions} from './model/store';

@NgModule({})
export class NgStoreModule {
  static forRoot(storeOptions: StoreOptions = defaultOptions): ModuleWithProviders {
    return {
      ngModule: NgStoreModule,
      providers: [
        {provide: StoreOptionsToken, useValue: storeOptions}
      ]
    };
  }
}
