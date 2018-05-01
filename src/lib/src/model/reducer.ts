import { Reducer } from 'redux';

/**
 * state数据接口
 */
export interface State {
  [prop: string]: any;
}

/**
 * reducer增强函数
 */
export type ReducerEnhancer<S extends State = State> = (reducer: Reducer<S>) => Reducer<S>;
