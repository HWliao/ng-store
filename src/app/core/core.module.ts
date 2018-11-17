import { NgModule } from '@angular/core';
import { StoreModule } from './store';
import { AopTestService } from './aop-test.service';

@NgModule({
  declarations: [],
  providers: [AopTestService],
  exports: [AopTestService],
  imports: [
    StoreModule.forRoot()
  ]
})
export class CoreModule { }
