/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName resetNewTab
 * @FileName popup.js
 * @CreateDate  周五  08/30/2024
 * @Description 这个是弹出窗口的逻辑代码
 * 这里可能会主要针对于页面消息发送
 ****************************************************************************/

/** 获取按钮节点 */
const sendMessageButton = document.getElementById("sendMessageButton");

/** 当按钮节点存在，则执行 */
if (sendMessageButton) {
  sendMessageButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          message: "Ok",
        },
        function (response) {
          window.close();
        }
      );
    });
  });
}

// const sessionStorage.getItem();
