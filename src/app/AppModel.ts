import { Model, Type } from './core/store';

class Test {
  test = 't1';
  testFn() { }
}

@Model('app')
export class AppModel extends Test {
  // 不支持
  // constructor(args: any) {
  //   super();
  // }

  constructor() {
    super();
    this.fn2 = () => { };
  }
  // state key
  count = 0;
  // state key
  title = 'lhw';
  // 不支持 为被初始化
  noInit: string;
  // state key
  fn1 = () => { };
  // state key 在构造函数中被初始化
  fn2() { }

  // 不支持 往往会使用箭头函数来定义，导致this被绑定
  get g1() { return 1; }
  // 不支持 往往会使用箭头函数来定义，导致this被绑定
  set s1(s) { }

  // action
  increase() {
    this.count++;
  }
  // action
  setTitle(title: string) {
    this.title = title;
  }
}

export const AppModelType = Type(AppModel);
