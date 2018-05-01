import { Reducer } from 'redux';

export interface Model {
  /**
   * 唯一id标识
   */
  id: number;
  /**
   * key name
   */
  key: string;
  /**
   *
   */
  state: {
    [prop: string]: any
  };
  reducer: Reducer;
}
