const sessionName = "130110404020lmssee@outlook.com";

/** 注册在 chrome 内核的监听回调
 *
 * 当 onMessage 触发时会触发（触发机制在弹出窗口中，即 popup.html）
 *
 *
 * - 回调中的 request 是发送来的消息文本
 * - sender 为发送者信息，包含发送人的 id 与其他信息
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  sessionStorage.setItem(sessionName, 1);

  // alert("i  am coming");
  // reloadPage();
  // const pNode = document.createElement("div");
  // pNode.innerHTML = "你好";
  // document.body.appendChild(pNode);
});

getStorage();

function reloadPage() {
  setTimeout(() => {
    // console.log("====================================");
    // console.log("即将刷新");
    // console.log("====================================");
    // window.location.reload();
  }, 800);
}

function getStorage() {
  const result = sessionStorage.getItem(sessionName);

  // if (result == 1) reloadPage();
}
