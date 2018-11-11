import { combineReducers, Reducer, ReducersMapObject, StoreEnhancer } from 'redux';
import { ReducerEnhancer } from '../config/store.config';

/**
 * 创建root reducer
 * @param reducers reducers
 * @param reducerEnhancer 增强
 */
export function createReducer(reducers: ReducersMapObject, reducerEnhancer: ReducerEnhancer): Reducer {
  return reducerEnhancer(combineReducers(reducers));
}

/**
 * 开启redux devtool
 * @param open 是否开启
 */
export function openDevtool(open: boolean): StoreEnhancer {
  if (open && (<any>window).__REDUX_DEVTOOLS_EXTENSION__) {
    return (<any>window).__REDUX_DEVTOOLS_EXTENSION__((<any>window).__REDUX_DEVTOOLS_EXTENSION__OPTIONS);
  }
  return returnSelf;
}

export const noop = () => {
};

export const returnSelf = m => m;

/**
 * @param obj The object to inspect.
 * @returns True if the argument appears to be a plain object.
 */
export default function isPlainObject(obj: any): boolean {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param  message The warning message.
 */
export function warning(message: string) {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) { }
}
