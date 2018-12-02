/*
 * Public API Surface of ngsr
 */
import './lib/polyfills';

export { AopService, Aspect, AspectAdvice, registerPointcut } from './lib/aop/aop.service';

export { ReducerEnhancer, StoreConfig, STORE_CONFIG_TOKEN } from './lib/store/redux/store.config';
export { StoreService } from './lib/store/service/store.service';

export { ModelConfig } from './lib/store/annotation/definitions';
export { Model, HackType as Hack } from './lib/store/annotation/model.annotation';
export { Store } from './lib/store/annotation/store.annotation';
export { Select } from './lib/store/annotation/selelct.annotation';

export { EventService } from './lib/event-stream/service/event.service';
