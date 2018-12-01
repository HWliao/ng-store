/**
 * 获取给定元素的类构造器
 * @param target 目标元素
 */
export function getConstructor(target: any): Function {
  return Reflect.getPrototypeOf(target).constructor;
}
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
/**
 * 判断表达式
 * @param expression 表达式
 * @param msg 提示
 */
export function checkArgument(expression: boolean, msg?: string) {
  if (!expression) {
    throw new Error(msg || 'Parameter error!');
  }
}
/**
 *
 * @param obj 检查是为空对象
 */
export function isEmptyObject(obj: object) {
  // tslint:disable-next-line
  for (const name in obj) {
    return false;
  }
  return true;
}
