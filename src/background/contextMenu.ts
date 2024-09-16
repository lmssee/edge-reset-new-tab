/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName contextMenu.ts
 * @CreateDate  周一  09/16/2024
 * @Description 功能菜单
 ****************************************************************************/

import { chrome } from 'a-edge-extends-types';
import { OnclickData } from 'a-edge-extends-types/contextMenus';
import { Tab } from 'a-edge-extends-types/tab';

(() => {
  console.log(chrome.i18n.getMessage('__MSG_name__'));

  chrome.contextMenus.create({
    id: '9863',
    title: 'lmssee',
  });
  chrome.contextMenus.create({
    id: '9864',
    parentId: '9863',
    title: '真真的',
  });
  chrome.contextMenus.onClicked.addListener((info: OnclickData, tab: Tab) => {
    console.log(info, tab);
  });
  console.log('====================================');
  console.log('右键执行');
  console.log('====================================');
})();
