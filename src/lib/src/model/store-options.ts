import { Middleware, ReducersMapObject, StoreEnhancer } from 'redux';
import { ReducerEnhancer, State } from './reducer';

/**
 * store 配置接口
 */
export interface StoreOptions<S extends State = State> {
  /**
   * root reducer 增强
   */
  reducerEnhancer?: ReducerEnhancer<S>;
  /**
   * 额外的reducer
   * 使用redux 函数式的方式扩充store中reducer
   * 用于不支持自动扫描的场景,加入reducer
   */
  extraReducers?: ReducersMapObject;
  /**
   * 初始状态
   */
  initState?: S;
  /**
   * redux中间件
   */
  middleware?: Middleware[];
  /**
   * 额外的reduxstore增强函数
   */
  extraEnhancers?: StoreEnhancer<S>[];
  /**
   * 是否开启redux devtool
   */
  devtool?: boolean;

  [key: string]: any;
}
