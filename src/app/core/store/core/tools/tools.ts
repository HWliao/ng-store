import { combineReducers, Reducer, ReducersMapObject, StoreEnhancer } from 'redux';
import { ReducerEnhancer } from '../config/store.config';

/**
 * 空函数
 */
export const noop = () => {
};
/**
 * 返回自己的函数
 * @param m 参数
 */
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
