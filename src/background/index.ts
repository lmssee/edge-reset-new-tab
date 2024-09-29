/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName background.js
 * @CreateDate  周一  09/02/2024
 * @Description 设定背景逻辑
 ****************************************************************************/

import { CRuntime } from '../common';

/** 将右键的执行代码放进来 */
import './contextMenu';

/// 获取当前刷新状态
/**
 * 作为背景逻辑，获取正在刷新的页面发送的消息。然后判断是否出发再次刷新
 *
 * 在页面被隐藏时，即  `tab` 的 `active` 为 `false` 时，发送
 *  */
CRuntime.messageAddListener(_r => {
  const response = _r as { [x: string]: number | string };
  /// 非礼勿视
  if (response['to'] !== 'backgroundJS') return;
  /** 发送者的页面 id */

  const { type } = response;
  if (type === 'reloadExtend') {
    chrome.runtime.reload();
    return;
  }
  /// 正在活动的页面发送来问询刷新页面的请求
});
