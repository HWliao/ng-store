import { Type } from '@angular/core';

/**
 * 元数据中store的标记
 */
export const MD_STORE = '@@[redux]store';
/**
 * store 元数据接口
 */
export interface StroeMetaData {
  propertyKey: string;
  model: Type<any>;
}
/**
 * 元数据中selec的标记
 */
export const MD_SELECT = '@@[redux]select';
export interface SelectMetadata {
  propertyKey: string;
  model: Type<any>;
  key?: string;
}
