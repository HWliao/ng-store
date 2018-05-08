import {Injectable, Optional, SkipSelf} from '@angular/core';
import {NgStoreModule} from '../ng-store.module';

@Injectable({
  providedIn: NgStoreModule
})
export class NgStoreService {

  constructor(@Optional() @SkipSelf() store: NgStoreService) {
    if (store) {
      throw new Error('NgStoreService 只能初始化一个实例!');
    }
  }

  public getStr() {
    return 'store1';
  }
}
