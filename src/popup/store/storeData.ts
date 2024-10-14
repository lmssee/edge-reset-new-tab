/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName storeData.ts
 * @CreateDate  周一  09/23/2024
 * @Description 数据池公用数据
 ****************************************************************************/

import { NewTabValueType } from 'src/common/types';

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
};
/** store 异步想关参数列  */
export const storeSyncList = {
  /**
   *  # REFRESH_SET_DELAY
   *  用于 `refreshSlice` 异步，设定当下的值\
   * 使用方法：
   * ```ts
   *  dispatch({
   *     type:storeSyncList.REFRESH_SET_DELAY,
   *     payload: { id: number,delay: number },
   *   });
   * ```
   *
   */
  refresh_set_delay: 'REFRESH_SET_DELAY',
  /**
   * # INIT_NEW_TAB_INFO
   * 用于 `tabSlice` 异步，获取页面的信息
   * 使用方法：
   * ```ts
   *      dispatch({
   *     type: storeSyncList.init_new_tab_info,
   *     payload: {
   *          selected: page.selected,
   *          url: page.custom
   *      },
   *   });
   * ```
   */
  init_new_tab_info: 'INIT_NEW_TAB_INFO',
};
