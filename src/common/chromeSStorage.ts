/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName chromeSStorage.ts
 * @CreateDate  周六  09/14/2024
 * @Description chrome.storage.sync 相关内容
 ****************************************************************************/

import { SyncKeyList, CmStorageSyncValue } from './types';

const chromeStorageSync = chrome.storage.sync;

/** # 保存在云端的数据
 *
 * - value `chrome.storage.sync` 的别名
 * - get 获取储存在云端的值
 * - set 设置新值到云端
 */
export const CSStorage = {
  /**  获取云端储存的值
   *
   * ```ts
   * type SyncKeyList =
   *  | "contextMenu"
   *  | "newTab"
   *  | "urlList"
   *  | "urlLastKey"
   *  | "search"
   * ```
   *
   *  @param {array} attributeList 字符串数组
   * @param {function} call  Back 回调函数
   */
  get(
    attributeList: SyncKeyList[],
    callBack: (result: CmStorageSyncValue) => void,
  ) {
    chromeStorageSync.get(attributeList, callBack as () => void);
  },
  /**  储存新的刷新页面数剧到 `chrome.storage.sync`
   *
   *  ```ts
   *
   *  type CmStorageSyncValueT = {
   *    contextMenu?: ContextMenuValue;
   *    newTab?: NewTabValue;
   *    search?: SearchSync;
   *    urlList?: URLList;
   *    urlLastKey?: URLLastKey;
   *  };
   *
   * ```
   *
   *
   */
  set(data: CmStorageSyncValue, callback?: (result: unknown) => undefined) {
    (typeof callback === 'function' &&
      (chromeStorageSync.set(data, callback), true)) ||
      chromeStorageSync.set(data);
  },
  /** 移除云端数据
   *
   * ```ts
   * type SyncKeyList = "contextMenu" | "newTab" | "urlList" | "urlLastKey" | "search"
   * ```
   *
   */
  remove(keys: SyncKeyList[], callback = undefined) {
    (typeof callback === 'function' &&
      (chromeStorageSync.remove(keys, callback), true)) ||
      chromeStorageSync.remove(keys);
  },
};
