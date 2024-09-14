/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName resetNewTab
 * @FileName newTabSelect.ts
 * @CreateDate  周五  09/13/2024
 * @Description 定制新标签页
 ****************************************************************************/

import { CSStorage, CTabs } from 'src/common';
import { commonData } from './commandData';
import { setStyle } from 'src/common/element';

/** 发送刷新的消息 */
export function sendMessageToPage(message: unknown): undefined {
  CTabs.value.sendMessage(
    commonData.id,
    message,
    // ,(response) => undefined
  );
}

/**
 * 管理新标签页的单选按钮组
 * - node             该元素
 * - addEvent         添加事件向元素
 * - init             初始化新标签页的相关内容
 */
export const manageNewTabSelect = {
  node: document.querySelector('div#manageNewTabSelect'),
  valueList: ['blankPage', 'recommend', 'customPage'],
  /** 向单选按钮组添加点击事件 */
  addEvent() {
    /** 没找到元素则直接返回 */
    if (!this.node) {
      commonData.error();
      return;
    }
    this.node.addEventListener('click', e => {
      const target = e.target as HTMLInputElement;
      if (
        target.nodeName.toLocaleLowerCase() == 'input' &&
        target.name === 'manageNewTab'
      ) {
        /** 取出 */
        const { value } = target;
        //  储存该值 ，万一哪用得上
        commonData.newTabValue = value;
        /** 非自定义时触发值改变 */
        if (value !== this.valueList[2]) {
          sendMessageToPage({
            type: 'newTab',
          });
        }
        /** 取出数据并更改后储存 */
        CSStorage.get(['newTab'], response => {
          CSStorage.set({
            newTab: { ...(response as { [x: string]: unknown }), type: value },
          });
        });
      }
    });
  },
  /** ## 初始化新标签相关
   * - 添加单选按钮组点击事件
   * - 向 commonData 添加事件
   * - 获取云端数据进行初始化当前单选按钮组的状态
   */
  init() {
    // 添加点击事件
    this.addEvent();
    /**  */
    commonData.watch('newTabValue', (property?: string, newValue?: unknown) => {
      console.log('====================================');
      console.log(property, newValue);
      console.log('====================================');
      // 根据值设置当前的
      if (newValue === this.valueList[2]) customNewTabBlock.show();
      else customNewTabBlock.hide();
    });

    // 获取云端储存的数据
    CSStorage.get(['newTab'], response => {
      console.log('====================================');
      console.log(response);
      console.log('====================================');
      const newTab = ((response as { newTab: unknown }).newTab as {
        type: string;
      }) || { type: this.valueList[0] };
      console.log(newTab);

      /** 拿到储存的值（没有则默认为 this.valueList） */
      const value = (newTab && newTab.type) || this.valueList[0];
      console.log(value);
      commonData.newTabValue = value;
      /** 设置默认的选择 */
      commonData.checked(value);
      /** 自定义显示输入框 */
      if (newTab.type == this.valueList[2]) {
        customNewTabBlock.show();
      } else {
        /// 无效代码
        customNewTabBlock.hide();
      }
    });
  },
};

/** # 自定义输入框
 * - node        元素
 * - init        是否已经初始化
 * - addEvent    添加点击事件
 * - show        元素展示
 * - hide        元素隐藏
 *
 */
export const customNewTabBlock = {
  node: document.querySelector('div#customNewTabBlock') as HTMLElement,
  init: false,
  addEvent() {},
  show() {
    /** 仅在第一次出现的时候 */
    if (!this.init) {
      this.init = true;
      this.addEvent();
    }
    setStyle(this.node, {
      height: '22px',
      opacity: '1',
      transition: 'height 0.5s 0s, opacity 0.3s 0.5s',
    });
  },
  hide() {
    setStyle(this.node, {
      height: '0px',
      opacity: '0',
      transition: 'height 0.5s 0.3s, opacity 0.3s 0s',
    });
  },
};
