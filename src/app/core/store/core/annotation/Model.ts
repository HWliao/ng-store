import { Constructor } from '../tools/types';

export const MODEL_MD_TOKEN = '';

/**
 * Model注解
 * @param model model配置
 */
export function ModelDecorator(model?: Model) {
  return (C: Constructor) => {
    Reflect.defineMetadata(MODEL_MD_TOKEN, model, C);
  };
}
/**
 * 在model类上进行标记
 */
export type ModelDecorator = (model?: Model) => (C: Constructor) => void;
/**
 * 标记参数
 */
export interface Model {
  [key: string]: any;
}

export declare const Model: ModelDecorator;
