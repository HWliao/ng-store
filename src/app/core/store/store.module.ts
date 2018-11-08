import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreConfig } from './service/store.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class StoreModule {
  static forRoot(config: StoreConfig): ModuleWithProviders {
    return {
      ngModule: StoreModule
    };
  }
}
