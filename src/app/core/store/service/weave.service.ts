import { Type, InjectionToken, Injectable } from '@angular/core';

// aspect
// advice 通知
// poincut 切入点
// weaving 编织
// target object 目标元素
/**
 * 在target object的metadata关于aspect advice的key
 * value为一个数组,内部存储了附加在target object上的aspect service/handler
 */
export const MD_ADVICE_ASPECT = '@@[aop]advice.aspect';
/**
 * 在目标对象上注册aspect
 * @param target 目标对象
 * @param name aspect name
 * @param token ng di token
 * @param handler 处理函数
 */
export function registerdAspect(target: Type<any>, name: string, token?: Type<any> | InjectionToken<any>, handler?: Function) {

}

export interface AspectAdvice {
  name: string;
  token?: Type<any> | InjectionToken<any>;
  handler?: Function;
}

@Injectable({ providedIn: 'root' })
export class AspectService { }
