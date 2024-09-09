/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName contents.js
 * @CreateDate  周日  09/01/2024
 * @Description 嵌入页面的逻辑代码
 * 嵌入行为由 {@link ../../manifest.json} 决定
 ****************************************************************************/

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

(() => {
  /**
   *  其他数据
   * - delay        定时器的延迟时间
   * - AC           控制器（并未使用）
   * - showTime     按钮展示的初始时间
   * - remainder    剩余的时间
   * - positiveStop 主动停止，用于在主动停止后又切换页面导致的页面恢复后自动直接恢复状态
   */
  const data = {
    /** 定时器的延迟时间 */
    delay: 1.2,
    /** 控制器，方便移除监听事件 */
    AC: new AbortController(),
    /** 按钮展示的初始时间 */
    showTime: 0,
    /** 剩余的时间 */
    remainder: 0,
    /** 主动停止 */
    positiveStop: false,
  };
  /** # 消息区
   *  由嵌入的脚本发送消息到后台脚本（原则上不直接发消息给弹出窗口）
   * - send            发送消息机制
   * - askRefresh      问询当前页面是否需要
   * - cancelRefresh   取消当前的消息
   * - suspendRefresh  暂停当前定时刷新
   * - restoreRefresh  恢复已暂停
   */
  const message = {
    /**  发送消息 */
    send(msg, callback) {
      if (typeof callback == "function")
        chrome.runtime.sendMessage({ ...msg, from: "contentJS" }, callback);
      else chrome.runtime.sendMessage({ ...msg, from: "contentJS" });
    },
    /** 发现消息问询是否刷新 */
    askRefresh() {
      this.send({
        type: "askRefresh",
        to: "backgroundJS",
      });
    },
    /** 取消定时刷新 */
    cancelRefresh() {
      this.send({
        type: "cancelRefresh",
        to: "backgroundJS",
      });
    },
    /** 暂停当前定时刷新 */
    suspendRefresh() {
      this.send({
        type: "suspendRefresh",
        to: "backgroundJS",
      });
    },
    /** 恢复已暂停的刷新 */
    restoreRefresh() {
      this.send({
        type: "restoreRefresh",
        to: "backgroundJS",
      });
    },
  };
  /** # 悬浮按钮
   * - node       元素
   * - id         元素的 id  字符串
   * - timeStamp  定时器返回的事件戳
   * - controller 控制器，方便移除监听事件，并未使用
   * - hide       隐藏悬浮按钮，触发于点击 “取消”
   * - show       展示悬浮按钮，触发于接受弹出窗口的消息
   * - suspend       暂停
   * - restore    恢复
   * - create     创建悬浮按钮
   */
  const floatButton = {
    /** 元素 */
    node: document.createElement("reset-new-tab-float-button"),
    name: "reset-new-tab-float-button",
    /** 悬浮按钮的 id */
    id: `reset-new-tab-float-button-${Math.floor(Math.random() * 10000)}-id`,
    /*** 定时器时间戳  */
    timeStamp: 0,
    /** 控制器，方便移除监听事件 */
    controller: new AbortController(),
    textShow: ["关闭", "暂停", "恢复"],
    /** 悬浮按钮隐藏 */
    hide() {
      this.node.style.visibility = "hidden";
      clearTimeout(this.timeStamp); /// 清理定时器
      this.timeStamp = 0; /// 重置定时器（无效操作）
      this._i(!1);
      this.node.lastChild.innerHTML = this.textShow[1];
      message.cancelRefresh();
    },
    /** 展示<停止刷新> 按钮 */
    show() {
      data.showTime = Date.now();
      let timeDifference = data.delay;
      // 若没有传值或传入的值为负时使用默认数据
      if (
        timeDifference <= 0 ||
        typeof timeDifference !== "number" ||
        isNaN(timeDifference)
      )
        timeDifference = 1.2;
      const _this = this;
      this.node.style = `visibility: visible;--refreshAnimationDelay: ${timeDifference}s;`;
      this.timeStamp = setTimeout(() => {
        _this.timeStamp = 0;
        window.location.reload();
      }, timeDifference * 1000);
    },
    /** 停止当前的状态 */
    suspend() {
      data.positiveStop = !0;
      const now = Date.now();
      data.delay = (data.remainder = now - data.showTime) / 1000; /// 暂停操作
      clearTimeout(this.timeStamp); /// 清理定时器
      this.timeStamp = 0; /// 重置定时器（无效操作）
      this.node.childNodes[1].innerHTML = this.textShow[2];
      this._i();
    },
    /** 恢复状态 */
    restore() {
      data.positiveStop = !1;
      data.showTime = Date.now();
      this._i(!1);
      this.node.childNodes[1].innerHTML = this.textShow[1];
      // window.getComputedStyle(this.node, "::before").animationPlayState = "running";
      this.timeStamp = setTimeout(() => {
        this.timeStamp = 0;
        window.location.reload();
      }, data.remainder);
    },
    /** 切换底部移动背景的动画状态
     * @param {boolean} [pause=true]  默认为让动画停止（true）
     */
    _i(pause = true) {
      const styles = document.styleSheets;
      const styleLength = styles.length - 1;
      for (let i = styleLength; i > -1; i--) {
        const ip = styles[i].ownerNode.dataset["ip"];
        if (ip && ip === this.id) {
          styles[i].cssRules[0].cssRules[0].style.animationPlayState = pause
            ? "paused"
            : "running";
          break;
        }
      }
    },
    /** 创建一个停止刷新的按钮 */
    create() {
      const node = this.node;
      const floatBlock = document.createDocumentFragment();
      const buttonStyle = document.createElement("style");
      buttonStyle.setAttribute("data-ip", this.id);
      /**
       * darken
       * color-dodge
       * color-burn
       */
      buttonStyle.innerText = `
      reset-new-tab-float-button#${this.id} {
          position:fixed;
          z-index:10000;
          right:20px;
          top:10%;
          width: 100px;
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          font-weight: 900;
          text-align:center;
          color: transparent;
          box-shadow: 1px 1px 8px #0009, -1px -1px 8px #fff6;
          transition: all  0.8s, visibility 0s;
          visibility: visible;
          visibility: hidden;

          &::before {
            // mix-blend-mode: color-dodge;
            content:'';
            background: #0d06;
            position:absolute;
            top:0px;
            left:0px;
            width:100%;
            height:100%;
            z-index:0;
            animation: var(--refreshAnimationDelay) linear 0s infinite backwards  refreshFloatButtonBefore;
          } 

          &:hover {
            transition: all  0.4s;
            box-shadow: 1px 1px 12px #ff06, -1px -1px 12px #0ff6;
          }
          
          & float-item {
            color: transparent;
            background-color: transparent;
            font-size: 16px;
            background-clip: text;
            display: inline-block;
            width: calc(50% - 1px);
            -webkit-user-select: none;
            user-select: none;
            cursor: pointer;
            &:nth-child(1) {
              background-image: linear-gradient(to left ,#f0f,#000);
              border-right:  2px;
              border-image: linear-gradient(to top, transparent 20%, #f0f, transparent 80%)  2 / 0px 2px 0px 0px   stretch;
            }

            &:nth-child(2) {
              background-image: linear-gradient(to left , #f00,#f0f);
            }
          }
        }
          
        #${this.id},#${this.id}::before {
          border-radius: 24px;
        }

        @keyframes refreshFloatButtonBefore {
          0% {
             clip-path: inset(0% 100% 0% 0% round 0 24px 24px 0);
          }

          100% {
             clip-path: inset(0% 0% 0% 0% round 0 24px  24px 0);   
          }
        }
        `
        .replace(/\n/gm, "")
        .replace(/\s{3,}/gm, " ");

      document.head.appendChild(buttonStyle);
      node.id = this.id;
      node.innerHTML = `<float-item>${this.textShow[0]}</float-item><float-item>${this.textShow[1]}</float-item>`;
      /** 注册监听事件 */
      node.addEventListener(
        "click",
        (e) => {
          const { target } = e;
          /// 取消当前的所有动作
          const __hide = () => this.hide();
          //  暂停操作
          const __stop = () => (this.suspend(), message.suspendRefresh());
          // 恢复状态
          const __restore = () => (this.restore(), message.restoreRefresh());
          if (target.innerHTML === this.textShow[0]) {
            __hide();
          } else if (target.innerText === this.textShow[1]) {
            __stop();
          } else if (target.innerHTML == this.textShow[2]) {
            __restore();
          } else if (target.id === this.id) {
            /// 不知道为什么，在实际使用中，点击会触发到这里，在测试的时候每次都触发的是 span 元素
            const y = e.offsetY;
            /// 这个判断可有可无
            if (y > 1 && y < target.offsetHeight - 1) {
              (e.offsetX < Math.floor(target.offsetWidth / 2) &&
                (__hide(), !0)) ||
                (data.positiveStop && (__restore(), !0)) ||
                __stop();
            }
          }
        },
        {
          signal: this.controller.signal,
        }
      );
      node.addEventListener("contextmenu", (e) => {
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
      });
      floatBlock.appendChild(node);
      document.body.appendChild(floatBlock);
    },
  };

  (() => {
    /** 注册在 chrome 内核的监听回调
     * 当 `chrome.runtime.onMessage` 触发时会触发（触发机制在弹出窗口中，即 popup.html）
     * - 回调中的 request 是发送来的消息文本
     * - sender 为发送者信息，包含发送人的 id 与其他信息
     */
    chrome.runtime.onMessage.addListener(function (
      request,
      sender,
      sendResponse
    ) {
      switch (request.type) {
        /// 收到刷新页面相关的消息
        case "refresh": {
          (floatButton[(data.delay = request.delay) == 0 ? "hide" : "show"](),
          !1) ||
            (request.state === "suspend" && floatButton.suspend());
          break;
        }
        default: {
          break;
        }
      }
    });

    /// 放一个监听者，当页面被隐藏时触发
    document.addEventListener("visibilitychange", () => {
      switch (document.visibilityState) {
        case "hidden": {
          data.positiveStop || floatButton.suspend();
          break;
        }
        /// 页面展示后再次开始问询是否刷新
        case "visible": {
          data.positiveStop || floatButton.restore();
          break;
        }
      }
    });

    /// 创建悬浮按钮
    floatButton.create();
    // 首次加载问询当前页面是否需要刷新
    message.askRefresh();
  })();
})();
/**
 *  本来想使用本地数据储存的变化机制进行处理事件
 *  后来发现这样的话每个页面都会接收到消息
 *  而且页面不知道到底消息发送给谁的，不过可以在弹出窗口用
 *  方便获取状态
 */
// chrome.storage.onChanged.addListener((changes, areaName) => {
//   console.log("====================================");
//   console.log(changes);
//   console.log(areaName);

//   console.log("====================================");
// });
