/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName common.js
 * @CreateDate  周日  09/01/2024
 * @Description 公共的逻辑
 ****************************************************************************/

import { chrome } from 'a-edge-extends-types';
import { Tab } from 'a-edge-extends-types/src/tabs';
import { commonData } from '../popup/commandData';

/** # 当前的页面的信息及向页面发送消息
 * - value                          `chrome.tabs`
 * - get(data, callback)             获取标签数据
 * - manage(data)                    整理数据
 * - getCurrentPage(callback)        获取当前页面数据
 */
export const CTabs = {
  value: chrome.tabs,
  /** 获取页签数据 */
  get(
    data: {
      [x: string]: unknown;
      active?: boolean | undefined;
      currentWindow?: boolean | undefined;
    },
    callback: (tabs: Tab[]) => undefined,
  ) {
    this.value.query(data, callback);
  },
  /** 取当前页面
   * @param {@link Function} callBack  回调函数，其第一个形参为 `tabs` 数组
   */
  getCurrentPage(callBack: (tabs: Tab[]) => undefined) {
    this.get({ active: true, currentWindow: true }, callBack);
  },
  /** 整理数据 */
  manage(data: { [x: string]: unknown }) {
    /// 获取现有的网页
    this.get({}, tabs => {
      const refreshPageList: { [x: string]: unknown } = {};
      /// 遍历已有的，并筛除不存在的
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          for (const element of tabs) {
            if (element.id === Number(key)) {
              refreshPageList[key] = data[key];
              break;
            }
          }
        }
      }
      CLStorage.set({ refreshPageList });
    });
  },
};
/** # 保存在云端的数据
 *
 * - value `chrome.storage.sync` 的别名
 * - get 获取储存在云端的值
 * - set 设置新值到云端
 */
export const CSStorage = {
  /** `chrome.storage.sync` 的别名 */
  value: chrome.storage.sync,
  /**  获取云端储存的值
   *  @param {@link Array} attributeList 字符串数组
   * @param {@ Function} call  Back 回调函数
   */
  get(attributeList: string[], callBack: (result: unknown) => undefined) {
    this.value.get(attributeList, callBack);
  },
  /**  储存新的刷新页面数剧到 `chrome.storage.sync` */
  set(data: { [x: string]: unknown }, callback = undefined) {
    (typeof callback === 'function' &&
      (this.value.set(data, callback), true)) ||
      this.value.set(data);
  },
  /** 移除云端数据 */
  remove(keys: string[], callback = undefined) {
    (typeof callback === 'function' &&
      (this.value.remove(keys, callback), true)) ||
      this.value.remove(keys);
  },
};

/** # 本地储存数据 chrome.storage.local
 * - value `                      chrome.storage.local` 的别名
 * - get(attributeList, callback) 获取本地储存的数据
 * - set(data)                    设置本地储存数据
 * - manage(delay = 0)            当刷新状态改变时整理数据
 */
export const CLStorage = {
  value: chrome.storage.local,
  /**  获取本地储存的值
   *  @param {string[]} attributeList 字符串数组
   * @param  {()=>null} call  Back 回调函数
   */
  get(
    attributeList: string[],
    callBack: ((result: { [key: string]: unknown }) => undefined) | undefined,
  ) {
    this.value.get(attributeList, callBack);
  },
  /**  储存新的刷新页面数剧到 `chrome.storage` */
  set(data: {
    [x: string]: unknown;
    refreshPageList?: { [x: string]: unknown };
  }) {
    this.value.set(data);
  },
  /**
   * 整理现有的已经开始刷新 tab
   * @param {number} delay  当前的状态，0 表示暂停定时刷新
   */
  manage(delay: number = 0) {
    const { id } = commonData;
    this.get(['refreshPageList'], (result: { [x: string]: unknown }) => {
      /** 获取或新建  `refreshPageList` */
      const refreshPageList: { [x: number]: unknown } =
        (result.refreshPageList || {}) as { [x: number]: unknown };
      if (delay == 0) delete refreshPageList[id];
      else
        refreshPageList[id] = {
          id,
          time: Date.now(),
          state: 'refresh',
          delay,
        };
      CTabs.manage(refreshPageList);
    });
  },
};
