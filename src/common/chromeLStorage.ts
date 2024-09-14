/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName chromeLStorage.ts
 * @CreateDate  周六  09/14/2024
 * @Description `chrome.storage.local` 相关逻辑
 ****************************************************************************/
import { chrome } from 'a-edge-extends-types';

const chromeStorageLocal = chrome.storage.local;

/** # 本地储存数据 chrome.storage.local
 * - get(attributeList, callback) 获取本地储存的数据
 * - set(data)                    设置本地储存数据

 */
export const CLStorage = {
  /**  获取本地储存的值
   *  @param {string[]} attributeList 字符串数组
   * @param  {()=>null} call  Back 回调函数
   */
  get(
    attributeList: string[],
    callBack?: ((result: { [key: string]: unknown }) => undefined) | undefined,
  ) {
    chromeStorageLocal.get(attributeList, callBack);
  },
  /**  储存新的刷新页面数剧到 `chrome.storage` */
  set(data: {
    [x: string]: unknown;
    refreshPageList?: { [x: string]: unknown };
  }) {
    chromeStorageLocal.set(data);
  },
};
