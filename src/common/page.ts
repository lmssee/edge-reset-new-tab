/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName page.ts
 * @CreateDate  周五  09/13/2024
 * @Description 页面的公共部分代码
 ****************************************************************************/

/**  关闭 html、body 弹出功能键 */
(() => {
  for (const element of [document.querySelector('html'), document.body]) {
    element &&
      element.addEventListener(
        'contextmenu',
        event => event.preventDefault(),
        false,
      );
  }
})();
