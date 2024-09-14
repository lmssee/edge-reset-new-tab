/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName index.ts
 * @CreateDate  周二  09/03/2024
 * @Description 新页的逻辑代码，为了与刷新页面的逻辑分开（这是嵌入逻辑）
 *
 *
 ****************************************************************************/

/** 引入公共执行部分 */

import { CLChanged } from 'src/common';
import '../common/page';

CLChanged((pref, areaName: 'local' | 'sync') => {
  /// 仅关心云端数据的改变
  if (areaName !== 'sync') return;
  console.log('====================================');
  console.log(pref);
  console.log('====================================');
});

blankPage();

document.body.addEventListener('contextmenu', e => {
  console.log('====================================');
  console.log(e);
  console.log('====================================');
});

// chrome.storage.sync.get(["url", "focus"], (result) => {
//   console.log(result);

//   if (result.url) {
//     /// 倘若有值则通过 location 进行重定向
//     location.replace(result.url);
//     if (result.focus) {
//       history.pushState("", "", "");
//     }
//   }
// });

/** 获取 popup 设置（该值是异步储存在 chrome 上）的值，该值具有全局性  */

/** 空白页 */
function blankPage() {
  const now = new Date();
  const year = now.getFullYear(),
    month = now.getMonth() + 1,
    today = now.getDate();
  const root = document.createDocumentFragment();
  const lmssee = document.createElement('div');
  lmssee.setAttribute('id', 'lmssee');
  // lmssee.id = "lmssee";
  lmssee.className = 'center';
  lmssee.innerHTML = `<div class="blankPage"> <div>${year}<span> 年 </span> ${month} <span> 月 </span> ${today} <span> 号 </span>  </div> 
    <div>周 ${['天', '一', '二', '三', '四', '五', '六'][now.getDay()]} </div>
    <div><span>天气：</span>未知</div></div>
    `;
  root.appendChild(lmssee);
  /// 移除旧的文档文件，主要发生在该页面打开时，恰好在弹出窗口配置新打开的标签页
  document.querySelector('body>div#lmssee') &&
    document.body.removeChild(
      document.querySelector('body>div#lmssee') as Element,
    );
  document.body.appendChild(root);
}
