/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName chromeSStorage.ts
 * @CreateDate  周六  09/14/2024
 * @Description chrome.storage.sync 相关内容
 ****************************************************************************/

import { chrome } from 'a-edge-extends-types';

const chromeStorageSync = chrome.storage.sync;

/** # 保存在云端的数据
 *
 * - value `chrome.storage.sync` 的别名
 * - get 获取储存在云端的值
 * - set 设置新值到云端
 */
export const CSStorage = {
  /**  获取云端储存的值
   *  @param {@link Array} attributeList 字符串数组
   * @param {@ Function} call  Back 回调函数
   */
  get(attributeList: string[], callBack: (result: unknown) => undefined) {
    chromeStorageSync.get(attributeList, callBack);
  },
  /**  储存新的刷新页面数剧到 `chrome.storage.sync` */
  set(data: { [x: string]: unknown }, callback = undefined) {
    (typeof callback === 'function' &&
      (chromeStorageSync.set(data, callback), true)) ||
      chromeStorageSync.set(data);
  },
  /** 移除云端数据 */
  remove(keys: string[], callback = undefined) {
    (typeof callback === 'function' &&
      (chromeStorageSync.remove(keys, callback), true)) ||
      chromeStorageSync.remove(keys);
  },
};
