/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName refresh.ts
 * @CreateDate  周五  09/13/2024
 * @Description 定时刷新逻辑
 ****************************************************************************/

import { debounce } from 'a-js-tools';
import { commonData } from './commandData';
import { sendMessageToPage } from './newTabSelect';
import { CLStorage } from 'src/common';

/** 元素 `div#refreshBlock` 相关
 *
 * - node  元素
 * - hide  隐藏该元素，在功能性页面将元素的 display 设置为 none
 */
export const refreshBlock = {
  node: document.querySelector('div#refreshBlock') as HTMLElement,
  /*** 在功能页上隐藏掉定时刷新块 */
  hide() {
    this.node!.style.display = 'none';
  },
};

/** 刷新按钮
 *
 * - node       按钮元素
 * - addEvent   向按钮添加事件，发生在初始化按钮
 * - setText    社会之按钮文本，在初始化按钮及更改页面刷新状态时
 * - init       初始化
 */
export const refreshButton = {
  node: document.getElementById('timedRefreshButton') as HTMLInputElement,
  /** 向按钮添加事件 */
  addEvent() {
    /// 当按钮节点不存在，则直接返回
    if (!this.node) {
      commonData.error();
      return;
    }
    this.node.addEventListener(
      'click',
      debounce(() => {
        /**  获取当前状态 */
        const delay =
          this.node!.value === '待开启'
            ? Math.max(commonData.refreshSelected, 1.2)
            : 0;
        /// 向特定页面发送消息
        sendMessageToPage({
          type: 'refresh',
          state: 'refresh',
          delay,
          visibilityState: true,
        });

        /// 更改文本展示
        this.setText(delay, true);
      }, 2000),
    );
  },

  /** 设定按钮的文本
   * @param { number} delay  当前的状态或即将设置的时间延迟
   * @param { boolean} [changState=false] 是否为改变状态
   */
  setText(delay: number, changState: boolean = false) {
    const style = this.node.style;
    if (delay == 0) {
      timedRefreshSelect.hide();
      this.node.value = '待开启';
      style.backgroundColor = '#6662';
      style.color = '#000';
    } else {
      timedRefreshSelect.show(delay);
      this.node.value = '待关闭';
      style.backgroundColor = '#9001';
      style.color = '#066';
    }
    /// 倘若要改变其状态
    changState && CLStorage.manage(delay);
  },
  /** 非功能页面初始化数据
   *
   * 初始化时获取页面的 ID ，并注册监听事件，然后根据 `chrome.storage` 储存数据进行状态恢复
   */
  init(id: number) {
    /// 注册监听事件监听（*由于页面不会存活太久，且没有需要主动移除监听的必要*）
    /** 查找当前获取焦点的页面，即我们的目标页面 */
    (commonData.id = id), this.addEvent(), timedRefreshSelect.addEvent();
    CLStorage.get(['refreshPageList'], (_r: { [x: string]: unknown }) => {
      const result = _r as {
        refreshPageList: { [x: number]: { delay: number } };
      };
      const a =
        result.refreshPageList && result.refreshPageList[id]
          ? result.refreshPageList[id].delay || 1.2
          : 0;
      this.setText(a);
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
  node: document.querySelector('div#timedRefreshSelect') as HTMLElement,
  show(delay: number) {
    /** 显示选择组的时候给定默认选择项 */
    commonData.checked((commonData.refreshSelected = Number(delay)).toString());
    this.node.style.height = '20px';
    this.node.style.opacity = '1';
    this.node.style.transition = 'height 0.15s 0s, opacity 0.15s 0.15s';
  },
  hide() {
    this.node!.style.transition = 'height 0.15s 0.15s, opacity 0.15s 0s';
    this.node.style.opacity = '0';
    this.node.style.height = '0px';
  },
  /** 添加事件 */
  addEvent() {
    if (!this.node) {
      commonData.error();
      return;
    }
    const node = this.node;
    node.addEventListener('click', (event: Event) => {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      // 只找到我们感兴趣的事件
      target.nodeName.toLocaleLowerCase() === 'input' &&
        target.name === 'timedRefreshTime' &&
        CLStorage.manage((commonData.refreshSelected = Number(target.value)));
    });
  },
};
