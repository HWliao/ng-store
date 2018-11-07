import { Modular } from './Model';

@Modular<CountModel>()
export class CountModel {
  constructor() {

  }

  count = 0;

  increase() {
    this.count += 1;
  }
}

