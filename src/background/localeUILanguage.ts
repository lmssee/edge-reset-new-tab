/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName localeUILanguage.ts
 * @CreateDate  周一  09/16/2024
 * @Description 获取当前的设定的默认的语言设置
 ****************************************************************************/

import { chrome } from 'a-edge-extends-types';

/** # 获取默认的语言设置
 *
 */
export function getLocalUILanguage() {
  return {
    language: chrome.i18n,
  };
}
