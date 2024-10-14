/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName common.js
 * @CreateDate  周日  09/01/2024
 * @Description 公共的逻辑
 ****************************************************************************/

import { CmStorageChanged } from './types';

export { CSStorage } from './chromeSStorage';
export { CRuntime } from './chromeRuntime';
/** 监听 storage 数据变化 */

export function CLChanged(
  callback: (changes: CmStorageChanged, areaName: string) => void,
) {
  chrome.storage.onChanged.addListener(callback);
}
