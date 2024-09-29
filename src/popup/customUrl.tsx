/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName customUrl.tsx
 * @CreateDate  周五  09/27/2024
 * @Description 自定义新标签页的网址
 ****************************************************************************/

import React, { useEffect, useRef, useState } from 'react';
import styles from './popup.module.scss';
import { CSStorage } from 'src/common';
import { getLocaleText } from 'src/common/getLocaleText';

/** 自定义新标签页的网址 */
export function CustomUrl() {
  /// 占位文本
  const placeHolder = getLocaleText('popup_input_placeholder');
  /// 输入框的值
  const [inputValue, setInputValue] = useState<string>('');
  /*** 状态展示 */
  const [spanText, setSpanText] = useState(['', '']);
  /** input 输入框 */
  const input = useRef(null);
  /** 定时器，因为并未发生在定时内，单独定义 */
  const [timeId, setTimeId] = useState<NodeJS.Timeout>();

  /** 提交文本信息 */
  function submit(url: string) {
    setInputValue(url);
    CSStorage.get(['newTab'], response => {
      const newTab = {
        ...response.newTab,
        url: url,
      };
      CSStorage.set(
        {
          newTab,
        },
        () => {
          setSpanText(['', '☑︎']);
          setTimeId(
            setTimeout(() => {
              setSpanText(['', '']);
            }, 800),
          );
        },
      );
    });
  }

  /// 首次渲染时获取值
  useEffect(() => {
    CSStorage.get(['newTab'], response => {
      if (response.newTab && response.newTab.url) {
        setInputValue(response.newTab.url);
      }
    });
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  /// 根据输入框的内容变化进行创建状态框
  useEffect(() => {
    console.log('document', document.activeElement);
    console.log('input current', input.current);
    console.log('focus', input.current);
    if (document.activeElement === input.current) setSpanText(['⟲', '']);
  }, [inputValue]);

  return (
    <div className={styles.popupInputParent}>
      <span>{spanText[0]}</span>
      <span>{spanText[1]}</span>
      <input
        type="text"
        ref={input}
        defaultValue={inputValue}
        placeholder={placeHolder}
        onChange={e => submit(e.target.value)}
      />
    </div>
  );
}
