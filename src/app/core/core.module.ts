import { NgModule, ModuleWithProviders } from '@angular/core';
import { StoreModule, STORE_CONFIG_TOKEN } from './store';
import { AopTestService } from './aop-test.service';
import { AnyAction } from 'redux';

@NgModule({
  declarations: [],
  imports: [
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: STORE_CONFIG_TOKEN,
          useValue: {
            initState: { testlhw: 'lhw' },
            extraReducers: {
              testlhw: (state = 'lhw1', action?: AnyAction) => {
                if (action && action.type === 'testlhw') {
                  return action.payload || '';
                }
                return state;
              }
            }
          }
        }
      ]
    };
  }
}
