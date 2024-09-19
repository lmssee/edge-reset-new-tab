/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName contextMenu.ts
 * @CreateDate  周一  09/16/2024
 * @Description 功能菜单
 ****************************************************************************/

import { CSStorage } from 'src/common';

(() => {
  CSStorage.get(['contextMenu'], result => {
    console.log(result);
    console.log(result.contextMenu);
    console.log(result.contextMenu && result.contextMenu!.visibility);
  });

  chrome.contextMenus.create({
    contexts: ['page'],
    id: '9863',
    title: 'lmssee 的广告位',
  });
  chrome.contextMenus.create({
    id: '9870',
    parentId: '9863',
    title: '无情的关闭',
  });
  chrome.contextMenus.create({
    id: '9871',
    parentId: '9863',
    title: '狠心的关闭',
  });

  /// 注册监听事件
  chrome.contextMenus.onClicked.addListener(info => {
    if (Number(info.menuItemId) > 9869) {
      CSStorage.set(
        { contextMenu: { visibility: 'hidden' } },
        (_r: unknown) => {
          const result = _r as { [x: string]: boolean };
          console.log('====================================');
          console.log(result);
          console.log('====================================');
        },
      );
    }
  });
  console.log('====================================');
  console.log('右键执行');
  console.log('====================================');
})();
