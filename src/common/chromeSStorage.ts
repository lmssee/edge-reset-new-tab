/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName chromeSStorage.ts
 * @CreateDate  周六  09/14/2024
 * @Description chrome.storage.sync 相关内容
 ****************************************************************************/

const chromeStorageSync = chrome.storage.sync;

/** # 保存在云端的数据
 *
 * - value `chrome.storage.sync` 的别名
 * - get 获取储存在云端的值
 * - set 设置新值到云端
 */
export const CSStorage = {
  /** 所有的间集合，非本数组的键是真的贱
   * ```ts
   *  const keyList:string[] = [
   *      'contextMenus',
   *    ];
   * ```
   */
  keyList: ['contextMenus'],
  /**  获取云端储存的值
   *  @param {array} attributeList 字符串数组
   * @param {function} call  Back 回调函数
   */
  get(
    attributeList: ('contextMenu' | 'newTab')[],
    callBack: (result: CmStorageSyncValueT) => undefined,
  ) {
    chromeStorageSync.get(attributeList, callBack);
  },
  /**  储存新的刷新页面数剧到 `chrome.storage.sync`
   *
   *  ```ts
   *
   *  type CmStorageSyncValueT = {
   *    contextMenu?: contextMenuValueT;
   *     newTab?: newTabValueT;
   *  };
   *
   * ```
   *
   *
   */
  set(data: CmStorageSyncValueT, callback?: (result: unknown) => undefined) {
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

/** contextMenu 值 */
export type contextMenuValueT = {
  visibility: 'visible' | 'hidden' | undefined;
};

/** newTab 值  */
export type newTabValueT = {
  type?: string;
  url?: string;
};

/** `chrome.storage.sync` 的值类型  */
export type CmStorageSyncValueT = {
  contextMenu?: contextMenuValueT;
  newTab?: newTabValueT;
};

/**
 * 监听数据变化时数据
 */
export type CmStorageChanged = {
  contextMenu?: {
    newValue: contextMenuValueT;
    oldValue: contextMenuValueT;
  };
  newTab?: {
    newValue: newTabValueT;
    oldValue: newTabValueT;
  };
};
