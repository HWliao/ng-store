import { Type, InjectionToken, Injectable, Injector } from '@angular/core';
import { warning } from '../store/core/tools/tools';

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
 * 在target object上为pointcut注册对应的处理aspect
 * @param target 目标对象
 * @param name aspect name
 * @param token angular inject token
 * @param handler 处理函数
 */
export function registerPointcut(target: Type<any>, name: string, token?: Type<any> | InjectionToken<any>, weave?: (any) => any) {
  if (!token && !weave) {
    warning(`[register pointcut] token/handler 不能都为空!`);
  }
  const advices: AspectAdvice[] = Reflect.getOwnMetadata(MD_ADVICE_ASPECT, target) || [];
  const theAdvice = advices.find(advice => advice.name === name);
  // 待注册的token或者handler与原有的token/handler 不一致则错误提示
  if (theAdvice && ((token && token !== theAdvice.token) || (weave && weave !== theAdvice.weave))) {
    warning(`[register pointcut] aspect ${name} 已经存在 token/handler,不能在注册其他的token/handler`);
  } else if (!theAdvice) {
    advices.push({ name, token, weave });
    Reflect.defineMetadata(MD_ADVICE_ASPECT, advices, target);
  }
}
/**
 * piontcut aspect advice
 */
export interface AspectAdvice {
  name: string;
  token?: Type<any> | InjectionToken<any>;
  weave?: (target: any) => any;
}

/**
 * aspect接口
 */
export interface Aspect {
  /**
   * aspect处理函数
   */
  weave(target: any): any;

  [key: string]: any;
  [key: number]: any;
}

/**
 * aop service 主要用来对target object进行weaving(编织)
 */
@Injectable({ providedIn: 'root' })
export class AopService {
  constructor(private readonly injector: Injector) { }
  weave(target: any, theInjector?: Injector) {
    const injector = theInjector || this.injector;
    const targetProto = Reflect.getPrototypeOf(target);
    const constructor = targetProto.constructor;
    const advices: AspectAdvice[] = Reflect.getOwnMetadata(MD_ADVICE_ASPECT, constructor) || [];
    advices.forEach(advice => {
      if (advice.token) {
        const service: Aspect = injector.get(advice.token);
        service.weave(target);
      } else if (advice.weave) {
        advice.weave(target);
      } else {
        warning(`[AopService weave] aspect ${advice.name} 没有对应的token/handler`);
      }
    });
  }
}
