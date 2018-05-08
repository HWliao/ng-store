import {InjectionToken} from '@angular/core';
import {StoreOptions} from '../model/store';

/**
 * store options inject token
 * @type {InjectionToken<any>}
 */
export const StoreOptionsToken = new InjectionToken('@@store_options');

/**
 * 默认配置
 * @type {{}}
 */
export const defaultOptions: StoreOptions = {};
