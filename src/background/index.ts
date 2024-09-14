/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName background.js
 * @CreateDate  周一  09/02/2024
 * @Description 设定背景逻辑
 ****************************************************************************/

import { chrome } from 'a-edge-extends-types';

/** 设置 `chrome.storage.local` 别名  */
const chromeLocalStorage = chrome.storage.local;

/** 消息处理机制
 * - id       页面的 id
 * - send     发送消息的方法
 *
 */
const message = {
  /** 页面的 id */
  /** 发送消息
   * @param  {number}  id            要发给的 id
   * @param  {any}  msg           要发送的消息
   * @param  {function|undefined} callback      回调方法
   */
  send(
    id: number,
    msg: unknown,
    callback?: (response: { [key: string]: unknown }) => undefined,
  ) {
    if (typeof callback === 'function')
      chrome.tabs.sendMessage(id, msg, callback);
    else chrome.tabs.sendMessage(id, msg);
  },
  /** 刷新页面 */
  refresh(data: { id: number; [key: string]: unknown }) {
    this.send(data.id, {
      ...data,
      type: 'refresh',
      time: Date.now(),
    });
  },
};

/// 获取当前刷新状态
// getState();
/**
 * 作为背景逻辑，获取正在刷新的页面发送的消息。然后判断是否出发再次刷新
 *
 * 在页面被隐藏时，即  `tab` 的 `active` 为 `false` 时，发送
 *  */
chrome.runtime.onMessage.addListener((_r: unknown, sender) => {
  const response = _r as { [x: string]: number | string };
  /// 非礼勿视
  if (response['to'] !== 'backgroundJS') return;
  /** 发送者的页面 id */
  const id = sender.id;
  const { type } = response;
  /// 正在活动的页面发送来问询刷新页面的请求
  if (
    (type === 'askRefresh' && sender.active) ||
    type === 'cancelRefresh' ||
    type === 'suspendRefresh' ||
    type === 'restoreRefresh'
  )
    getLocalRefreshList((_r: { [x: string]: unknown }) => {
      const result = _r as {
        refreshPageList: {
          [x: number]: { [key: string]: unknown; id: number };
        };
      };
      // 收到页面的问询消息后从
      if (result.refreshPageList && result.refreshPageList[id]) {
        switch (type) {
          case 'askRefresh': {
            message.refresh(result.refreshPageList[id]);
            break;
          }
          case 'cancelRefresh': {
            delete result.refreshPageList[id];
            chromeLocalStorage.set({
              refreshPageList: result.refreshPageList,
            });
            break;
          }
          default: {
            chromeLocalStorage.set({
              refreshPageList:
                ((result.refreshPageList[id].state =
                  (type === 'suspendRefresh' && 'suspend') || 'refresh'),
                result.refreshPageList),
            });
            break;
          }
        }
      }
    });
});

/**
 *  获取本地储存的定时刷新页面的值
 */
function getLocalRefreshList(
  callBack: (result: { [key: string]: unknown }) => undefined,
) {
  chromeLocalStorage.get(['refreshPageList'], callBack);
}
getState;
/**
 * 获取当前刷新页面的状态
 */
function getState() {
  /**  在弹出窗口不打印该信息  */
  if (!location.pathname.endsWith('background.js')) return;

  getLocalRefreshList((result: { [x: string]: unknown }) => {
    const refreshPageList = result['refreshPageList'] || {};
    chrome.tabs.query({}, response => {
      console.log(
        `\n\n当前共打开${response.length}个窗口，正在刷新的有${
          Object.keys(refreshPageList).length
        }个窗口`,
      );
      for (const key in refreshPageList) {
        for (const element of response) {
          if (element.id === Number(key)) {
            const t = (r: string, n: number) => `\u001B[${n}m${r}\u001B[m`;
            element.active
              ? console.log(`      ${t(`页面：${element.title}`, 34)}`)
              : console.log(`      ${t(`页面（隐藏）：${element.title}`, 37)}`);
            break;
          }
        }
      }
      console.log('================================');
      console.log('当前窗口信息', response);
      console.log('刷新页面的信息', refreshPageList);
      console.log('====================================\n\n');
    });
  });
}
