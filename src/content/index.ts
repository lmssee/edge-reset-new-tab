/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName contents.js
 * @CreateDate  周日  09/01/2024
 * @Description 嵌入页面的逻辑代码
 * 嵌入行为由 {@link ../../manifest.json} 决定
 *
 *
 * ## 嵌入逻辑
 *
 * ### 定时刷新
 * - 以 js 向页面嵌入一个按钮（在 popup 窗口点击本页面定时刷新后）
 * - 由属性记录时间，开启刷新
 * - 当刷新被暂停，记录当下剩余时间
 * - 恢复时赋值给该页面，并重复记录开始时间
 * - 页面刷新后回去后台问询当前刷新的原本时常间隔，所以不记录
 *
 ****************************************************************************/

import { data } from './data';
import { floatButton } from './floatButton';
import { message } from './message';
/** 开发打开一键重启扩展按钮 */
import './development';
import { CRuntime } from 'src/common';

CRuntime.messageAddListener((r: unknown) => {
  const request = r as { type: string; state: string; delay: number };
  switch (request.type) {
    /// 收到刷新页面相关的消息
    case 'refresh': {
      floatButton[(data.delay = request.delay) == 0 ? 'hide' : 'show'](), !1;
      request.state === 'suspend' && // 上一个状态为暂停状态，设置主动暂停状态及设置状态暂停
        (floatButton.suspend(), (data.positiveStop = !0));
      break;
    }
    default: {
      break;
    }
  }
});

// chrome.runtime.onMessage.addListener(function () {
//   switch (request.type) {
//     /// 收到刷新页面相关的消息
//     case 'refresh': {
//       floatButton[(data.delay = request.delay) == 0 ? 'hide' : 'show'](), !1;
//       request.state === 'suspend' && // 上一个状态为暂停状态，设置主动暂停状态及设置状态暂停
//         (floatButton.suspend(), (data.positiveStop = !0));
//       break;
//     }
//     default: {
//       break;
//     }
//   }
// });

/// 放一个监听者，当页面被隐藏时触发
document.addEventListener('visibilitychange', () => {
  switch (document.visibilityState) {
    case 'hidden': {
      floatButton.state && !data.positiveStop && floatButton.suspend();
      break;
    }
    /// 页面展示后再次开始问询是否刷新
    case 'visible': {
      floatButton.state && !data.positiveStop && floatButton.restore();
      break;
    }
  }
});

/// 创建悬浮按钮
floatButton.create();
// 首次加载问询当前页面是否需要刷新
message.askRefresh();

/**
 *  本来想使用本地数据储存的变化机制进行处理事件
 *  后来发现这样的话每个页面都会接收到消息
 *  而且页面不知道到底消息发送给谁的，不过可以在弹出窗口用
 *  方便获取状态
 */
// chrome.storage.onChanged.addListener((changes, areaName) => {
//   console.log("====================================");
//   console.log(changes);
//   console.log(areaName);

//   console.log("====================================");
// });
