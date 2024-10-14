/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName storeData.ts
 * @CreateDate  周一  09/23/2024
 * @Description 数据池公用数据类型
 ****************************************************************************/

import { NewTabValueType, SearchSync } from 'src/common/types';

/** useSelector 使用 state 数据类型 */
export type StoreState = {
  /** 当前标签页信息 */
  tab: {
    /** 当前选择的项
     *
     *  -  `blank`      空白项
     *  -  `recommend`  推荐项
     *  -  `custom`     自定义项
     */
    selected: NewTabValueType;
    /** 自定项被选择时的值 */
    custom: string;
  };
  searchEngine: SearchSync;
};
/** store 异步想关参数列  */
export const storeSyncList = {
  /**
   * # INIT_NEW_TAB_INFO
   * 用于 `tabSlice` 异步，获取页面的信息
   * 使用方法：
   * ```ts
   *      dispatch({
   *         type: storeSyncList.init_new_tab_info,
   *         payload: {
   *           selected: page.selected,
   *           url: page.custom
   *      },
   *   });
   * ```
   */
  init_new_tab_info: 'INIT_NEW_TAB_INFO',
  /**
   * ## SET_SEARCH_ENGINE_DEFAULT
   *
   * 设置检索引擎的当前选择项
   * 使用方法：
   * ```ts
   *      dispatch({
   *        type: storeSyncList.set_search_engine_default,
   *        payload: SearchEngine ,
   *   });
   * ```
   *
   */
  set_search_engine_default: 'SET_SEARCH_ENGINE_DEFAULT',
  /**
   * ## SET_SEARCH_ENGINE_LIST
   *
   * 设置检索引擎的当前列表（有序）
   * 使用方法：
   * ```ts
   *      dispatch({
   *       type: storeSyncList.set_search_engine_list,
   *       payload:  SearchEngine[],
   *   });
   * ```
   */
  set_search_engine_list: 'SET_SEARCH_ENGINE_LIST',
};
