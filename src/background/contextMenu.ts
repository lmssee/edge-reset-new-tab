/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName contextMenu.ts
 * @CreateDate  周一  09/16/2024
 * @Description 功能菜单
 ****************************************************************************/

import { CmConTextMenusCreateProperties } from 'a-edge-extends-types/contextMenus';
import { CSStorage } from '../common';

/** 将要添加到按钮组的列 */
const menusData: CmConTextMenusCreateProperties[] = [];

/** 主要逻辑在这里
 *
 * 初始化时获取值查看是否允许开启
 */
(() => {
  /** 初始化时参看是否允许配置右键菜单，当然 */
  CSStorage.get(['contextMenu'], result => {
    // 仅在设置值为 ‘visible’ 的时候显示菜单，意味着
    if (result.contextMenu && result.contextMenu.visibility !== 'visible') {
      createMenus();
    }
  });
})();

/**
 * #  创建右键菜单
 *
 * - 大于 9869 的为关闭按钮
 */
function createMenus() {
  const dataList: CmConTextMenusCreateProperties[] = [
    {
      title: 'lmssee 的广告位',
      id: '1011',
    },
    ...menusData,
    {
      id: '9870',
      title: '无情的关闭',
    },
    {
      id: '9871',
      title: '狠心的关闭',
    },
  ];
  for (const element of dataList) {
    chrome.contextMenus.create(
      Object.assign(element, element.id === '1011' ? {} : { parentId: '1011' }),
    );
  }
  addEvent();
}

/**
 *
 * 开启右键菜单
 */

export function openContextMenus() {
  closeMenus(!1);
}
/** 关闭当前功能键  */
export function closeMenus(close: boolean = true) {
  CSStorage.set(
    { contextMenu: { visibility: close ? 'hidden' : 'visible' } },
    () =>
      close
        ? (chrome.contextMenus.removeAll(), undefined)
        : (createMenus(), undefined),
  );
}

/** 添加事件 */
function addEvent() {
  /// 注册监听事件
  chrome.contextMenus.onClicked.addListener(info => {
    // 申请关闭
    if (Number(info.menuItemId) > 9869) {
      closeMenus();
    }
  });
}
