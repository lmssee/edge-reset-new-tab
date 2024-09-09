/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName common.js
 * @CreateDate  周日  09/01/2024
 * @Description 公共的逻辑
 ****************************************************************************/
/**  关闭 html、body 弹出功能键 */
(() => {
  for (const element of [document.querySelector("html"), document.body]) {
    element.addEventListener(
      "contextmenu",
      (event) => event.preventDefault(),
      false
    );
  }
})();

/** # 防抖函数
 *
 * @param {function} callback 回调函数
 * @param {number} delay
 */
function debounce(callback, delay = 800) {
  if (typeof delay !== "number" || isNaN(delay)) delay = 800;
  let timedTag;
  const clear = () => clearTimeout(timedTag);
  function result(...args) {
    clear() ||
      (timedTag = setTimeout(
        () => Reflect.apply(callback, null, args),
        Math.max(delay, 0)
      ));
  }
  result.prototype.clear = clear;
  return result;
}
/** # 节流函数
 *
 * @param {function} callback 回调函数
 * @param {number} delay
 */
function throttle(callback, delay) {
  if (typeof delay !== "number" || isNaN(delay)) delay = 800;
  let inThrottle = !0;
  return (...args) =>
    inThrottle &&
    (Reflect.apply(callback, null, args),
    (inThrottle = !1),
    setTimeout(() => (inThrottle = !0), Math.max(delay, 0)));
}
