/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName resetNewTab
 * @FileName popup.js
 * @CreateDate  周五  08/30/2024
 * @Description 这个是弹出窗口的逻辑代码
 * 这里可能会主要针对于页面消息发送
 ****************************************************************************/

/** 设置 `chrome.tabs` 别名
 * - value `chrome.tabs`
 * - get 获取标签数据
 * - manage  整理数据
 * - getCurrentPage 获取当前页面数据
 * - sendMessageToPage 向本页面发送消息
 */
const CTabs = {
  value: chrome.tabs,
  /** 获取页签数据 */
  get(data, callback) {
    this.value.query(data, callback);
  },
  /** 取当前页面
   * @param {@link Function} callBack  回调函数，其第一个形参为 `tabs` 数组
   */
  getCurrentPage(callBack) {
    this.get({ active: true, currentWindow: true }, callBack);
  },
  /** 整理数据 */
  manage(data) {
    /// 获取现有的网页
    this.get({}, (tabs) => {
      const refreshPageList = {};
      /// 遍历已有的，并筛除不存在的
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          for (const element of tabs) {
            if (element.id == key) {
              refreshPageList[key] = data[key];
              break;
            }
          }
        }
      }
      CLStorage.set({ refreshPageList });
    });
  },
  /** 发送刷新的消息 */
  sendMessageToPage(message) {
    this.value.sendMessage(
      commonData.id,
      message
      // ,(response) => undefined
    );
  },
};
/** 设置 `document.body` 别名 */
const body = document.body;
/** 设置 `chrome.storage.local` 别名
 * - value `chrome.storage.local` 的别名
 * - get 获取本地储存的数据
 * - set 设置本地储存数据
 * - manage  当刷新状态改变时整理数据
 */
const CLStorage = {
  value: chrome.storage.local,
  /**  获取本地储存的值
   *  @param {@link Array} attributeList 字符串数组
   * @param {@ Function} call  Back 回调函数
   */
  get(attributeList, callBack) {
    this.value.get(attributeList, callBack);
  },
  /**  储存新的刷新页面数剧到 `chrome.storage` */
  set(data) {
    this.value.set(data);
  },
  /**
   * 整理现有的已经开始刷新 tab
   * @param {#link Number} delay  当前的状态，0 表示暂停定时刷新
   */
  manage(delay = 0) {
    const { id } = commonData;
    this.get(["refreshPageList"], (result) => {
      /** 获取或新建  `refreshPageList` */
      const refreshPageList = result.refreshPageList || {};
      if (delay == 0) delete refreshPageList[id];
      else
        refreshPageList[id] = {
          id,
          time: Date.now(),
          state: "refresh",
          delay,
        };
      CTabs.manage(refreshPageList);
    });
  },
};

/** # 保存在云端的数据
 *
 * - value `chrome.storage.sync` 的别名
 * - get 获取储存在云端的值
 * - set 设置新值到云端
 */
const CSStorage = {
  /** `chrome.storage.sync` 的别名 */
  value: chrome.storage.sync,
  /**  获取云端储存的值
   *  @param {@link Array} attributeList 字符串数组
   * @param {@ Function} call  Back 回调函数
   */
  get(attributeList, callBack) {
    this.value.get(attributeList, callBack);
  },
  /**  储存新的刷新页面数剧到 `chrome.storage.sync` */
  set(data, callback = undefined) {
    (typeof callback === "function" &&
      (this.value.set(data, callback), true)) ||
      this.value.set(data);
  },
  /** 移除云端数据 */
  remove(keys, callback = undefined) {
    (typeof callback === "function" &&
      (this.value.remove(keys, callback), true)) ||
      this.value.remove(keys);
  },
};

/** 公用数据
 * - id                     页面的 id，用于发送给消息或比对数据
 * - newTabValue            新标签页被储存的值
 * - refreshSelected        刷新页面被储存的值
 * - checked                切换默认选择，用户初始化和候选
 */
const commonData = {
  /** 页面的 id ，在恢复数据时会用到 */
  id: 0,
  /** 储存被选择的值，用于在同一页面的再次展示 */
  refreshSelected: 0,
  /** 储存被选中新标签页的值  */
  newTabValue: "",
  /** 按钮组默认被选中
   *
   * @param {string} value  当前选择的单选按钮的 value 值
   */
  checked(value) {
    document
      .querySelector(`input[value='${value}']`)
      .setAttribute("checked", true);
  },
  /** 出现错误 */
  error() {
    alert("出现错误，请稍后重试");
    window.close();
  },
};

/**
 * 管理新标签页的单选按钮组
 * - node             该元素
 * - addEvent         添加事件向元素
 * - init             初始化新标签页的相关内容
 */
const manageNewTabSelect = {
  node: document.querySelector("div#manageNewTabSelect"),
  valueList: ["blankPage", "recommend", "customPage"],
  /** 向单选按钮组添加点击事件 */
  addEvent() {
    /** 没找到元素则直接返回 */
    if (!this.node) {
      commonData.error();
      return;
    }
    this.node.addEventListener("click", (e) => {
      const { target } = e;
      if (
        target.nodeName.toLocaleLowerCase() == "input" &&
        target.name === "manageNewTab"
      ) {
        /** 取出 */
        const { value } = target;
        commonData.newTabValue = value;

        CSStorage.set({
          newtab:
            value === this.valueList[1]
              ? { type: value }
              : { type: value, custom: true },
        });
      }
    });
  },
  /** 初始化新标签相关 */
  init() {
    this.addEvent();
    CSStorage.remove(["type", "refreshList"]);
    CSStorage.get(["newtab", "refreshList"], ({ newtab, refreshList }) => {
      console.log("====================================");
      console.log(newtab, refreshList);
      console.log("====================================");
      commonData.checked(newtab.type || this.valueList[0]);
    });
  },
};

/** 元素 `div#refreshBlock` 相关
 *
 * - node  元素
 * - hide  隐藏该元素，在功能性页面将元素的 display 设置为 none
 */
const refreshBlock = {
  node: document.querySelector("div#refreshBlock"),
  /*** 在功能页上隐藏掉定时刷新块 */
  hide() {
    this.node.style.display = "none";
  },
};
/** 刷新按钮
 *
 * - node       按钮元素
 * - addEvent   向按钮添加事件，发生在初始化按钮
 * - setText    社会之按钮文本，在初始化按钮及更改页面刷新状态时
 * - init       初始化
 */
const refreshButton = {
  node: document.getElementById("timedRefreshButton"),
  /** 向按钮添加事件 */
  addEvent() {
    /// 当按钮节点不存在，则直接返回
    if (!this.node) {
      commonData.error();
      return;
    }
    this.node.addEventListener("click", () => {
      /**  获取当前状态 */
      const delay =
        this.node.value === "待开启"
          ? Math.max(commonData.refreshSelected, 1.2)
          : 0;
      /// 向特定页面发送消息
      CTabs.sendMessageToPage({
        type: "refresh",
        state: "refresh",
        delay,
        visibilityState: true,
      });

      /// 更改文本展示
      this.setText(delay, true);
    });
  },

  /** 设定按钮的文本
   * @param {@link Number} delay  当前的状态或即将设置的时间延迟
   * @param {boolean} [changState=false] 是否为改变状态
   */
  setText(delay, changState = false) {
    const style = this.node.style;
    if (delay == 0) {
      timedRefreshSelect.hide();
      this.node.value = "待开启";
      style.backgroundColor = "#000";
      style.color = "#fff";
    } else {
      timedRefreshSelect.show(delay);
      this.node.value = "待关闭";
      style.backgroundColor = "#0fc";
      style.color = "#f03";
    }
    /// 倘若要改变其状态
    changState && CLStorage.manage(delay);
  },
  /** 非功能页面初始化数据
   *
   * 初始化时获取页面的 ID ，并注册监听事件，然后根据 `chrome.storage` 储存数据进行状态恢复
   */
  init(id) {
    /// 注册监听事件监听（*由于页面不会存活太久，且没有需要主动移除监听的必要*）
    /** 查找当前获取焦点的页面，即我们的目标页面 */
    (commonData.id = id), this.addEvent(), timedRefreshSelect.addEvent();
    CLStorage.get(["refreshPageList"], (result) => {
      this.setText(
        result.refreshPageList && result.refreshPageList[id]
          ? result.refreshPageList[id].delay || 1.2
          : 0
      );
    });
  },
};

/**
 *  定时刷新页面的单选按钮组
 *
 * - node      元素
 * - show      展示该元素，该方法在定时刷新按钮文本切换为 "待关闭" 时触发
 * - hide      隐藏该元素，发生在定时刷新按钮文本切换为 "待开启" 时触发
 * - addEvent  注册事件
 */
const timedRefreshSelect = {
  node: document.querySelector("div#timedRefreshSelect"),
  show(delay) {
    /** 显示选择组的时候给定默认选择项 */
    commonData.checked((commonData.refreshSelected = Number(delay)));
    this.node.style.height = "20px";
    this.node.style.opacity = "1";
    this.node.style.transition = "height 0.15s 0s, opacity 0.15s 0.15s";
  },
  hide() {
    this.node.style.transition = "height 0.15s 0.15s, opacity 0.15s 0s";
    this.node.style.opacity = "0";
    this.node.style.height = "0px";
  },
  /** 添加事件 */
  addEvent() {
    if (!this.node) {
      commonData.error();
      return;
    }
    const node = this.node;
    node.addEventListener("click", (event) => {
      const target = event.target;
      // 只找到我们感兴趣的事件
      target.nodeName.toLocaleLowerCase() === "input" &&
        target.name === "timedRefreshTime" &&
        CLStorage.manage((commonData.refreshSelected = Number(target.value)));
    });
  },
};

/**
 *  页面每次点开时需要根据当前页面的 `url` 属性判断页面作用
 *  - 新建标签页
 *  - 其它内置页
 *  - 普通页面
 *
 *  把这个数据放在 chrome.storage.local
 * _chrome.storage 可以在弹出窗口用，也可以在嵌入脚本用，但是不能用于页面脚本_
 */
(() => {
  CTabs.getCurrentPage((tabs) => {
    /** 当前页面的信息 */
    const page = tabs[0];
    /// 初始化标签页
    manageNewTabSelect.init();
    if (page.url === "edge://newtab/") {
      refreshBlock.hide();
      /// 新建页面
    } else if (
      page.url.startsWith("edge://") ||
      /.*microsoft\.com.*/.test(page.url)
    ) {
      /// 非新加标签页和 microsoft 自己的网页是不给注入脚本的
      ///  也就无法实现刷新，这时候也隐藏按钮
      refreshBlock.hide();
      return;
    }
    /// 非功能页默认为普通的页面（可执行刷新的页面），开始查询是否正在刷新
    refreshButton.init(page.id);
  });
})();
