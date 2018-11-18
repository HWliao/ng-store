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
}
