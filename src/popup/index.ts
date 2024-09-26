/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName resetNewTab
 * @FileName popup.js
 * @CreateDate  周五  08/30/2024
 * @Description 这个是弹出窗口的逻辑代码
 * 这里可能会主要针对于页面消息发送
 ****************************************************************************/
/** 原来引入是有顺序的 */

import { CmTabsTab } from 'a-edge-extends-types/tab';
import '../common/page';

/** 引入公共执行部分 */
import { popupData } from './popupData';
import { manageNewTabSelect } from './newTabSelect';

/** 引入页面的公共部分逻辑 */
import { CTabs } from '../common/chromeTabs';

/**
 *  页面每次点开时需要根据当前页面的 `url` 属性判断页面作用
 *  - 新建标签页
 *  - 其它内置页
 *  - 普通页面
 *
 *  把这个数据放在 chrome.storage.local
 * _chrome.storage 可以在弹出窗口用，也可以在嵌入脚本用，但是不能用于页面脚本_
 */
CTabs.getCurrentPage((tabs: CmTabsTab[]) => {
  /** 当前页面的信息 */
  const page = tabs[0];
  /// 初始化标签页
  manageNewTabSelect.init();
  popupData.url = page.url!; /// 储存当前页面的 url
  popupData.id = page.id!; /// 储存当前页面的 id
});
