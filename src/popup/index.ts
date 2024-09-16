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
import { Tab } from 'a-edge-extends-types/tab';
import '../common/page';

/** 引入公共执行部分 */
import { commonData } from './commandData';
import { manageNewTabSelect } from './newTabSelect';
import { refreshBlock, refreshButton } from './refresh';

/** 引入页面的公共部分逻辑 */
import { CTabs } from 'src/common/chromeTabs';

/**
 *  页面每次点开时需要根据当前页面的 `url` 属性判断页面作用
 *  - 新建标签页
 *  - 其它内置页
 *  - 普通页面
 *
 *  把这个数据放在 chrome.storage.local
 * _chrome.storage 可以在弹出窗口用，也可以在嵌入脚本用，但是不能用于页面脚本_
 */
CTabs.getCurrentPage((tabs: Tab[]) => {
  /** 当前页面的信息 */
  const page = tabs[0];
  /// 初始化标签页
  manageNewTabSelect.init();
  commonData.url = page.url!; /// 储存当前页面的 url
  commonData.id = page.id!; /// 储存当前页面的 id

  //// 这里注意大小写的问题
  if (page.url === 'edge://newtab/') {
    refreshBlock.hide();
    /// 新建页面
    return;
  } else if (
    !page.url!.startsWith('http') ||
    !page.url!.startsWith('file://') ||
    /.*microsoft\.com.*/.test(page.url!)
  ) {
    /// 非新加标签页和 microsoft 自己的网页是不给注入脚本的
    refreshBlock.hide(); ///  隐藏刷新块
    return;
  }
  refreshButton.init(page.id!); /// 非功能页默认为普通的页面（可执行刷新的页面），开始查询是否正在刷新
});
