/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName newTab.js
 * @CreateDate  周二  09/03/2024
 * @Description 新页的逻辑代码，为了与刷新页面的逻辑分开（这是嵌入逻辑）
 *
 *
 ****************************************************************************/
(() => {
  function getTime() {
    const now = new Date();
    const year = now.getFullYear(),
      month = now.getMonth() + 1,
      today = now.getDate();
    return `<div class="blankPage">${year}<span> 年 </span> ${month} <span> 月 </span> ${today} <span> 号 </span>  </div> 
    <div>周 ${["天", "一", "二", "三", "四", "五", "六"][now.getDay()]} </div>
    <div><span>天气：</span>未知</div>
    `;
  }

  document.querySelector("div.center").innerHTML = getTime();
  document.body.addEventListener("contextmenu", (e) => {
    console.log("====================================");
    console.log(e);
    console.log("====================================");
  });

  /** 获取 popup 设置（该值是异步储存在 chrome 上）的值，该值具有全局性  */
})();
