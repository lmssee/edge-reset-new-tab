/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName refreshRadio.tsx
 * @CreateDate  周日  09/22/2024
 * @Description 按钮组
 ****************************************************************************/

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CSStorage } from 'src/common';
import { setTabSelected } from './store/tabSlice';
import styles from './popup.module.scss';
import { getLocaleText } from 'src/common/getLocaleText';

/** 下部的单选框
 *
 * 初始化的时候会更具当前的
 *
 */
export function RadioBlock() {
  /** 当前显示的数据 */
  const [OldValue, setOldValue] = useState<string>('');
  // 获取按钮组
  const radio = useRef(null);
  /** 数列 */
  const [dataList, setDataList] = useState<{ text: string; value: string }[]>(
    [],
  );

  const dispatch = useDispatch();

  /** 设定选中状态 */
  function setChecked(en: string) {
    if (!radio.current) return;
    const element = document.querySelector(
      `input[value='${en}']`,
    ) as HTMLInputElement;
    if (!element) return;
    element.checked = true;
  }

  /** 改变当前的值 */
  function changeState(str: string) {
    if (OldValue !== str) {
      CSStorage.get(['newTab'], response => {
        CSStorage.set({
          newTab: {
            ...response.newTab,
            type: str,
          },
        });
      });

      setOldValue(str);
    }
  }

  /** 初始化数据 */
  useLayoutEffect(() => {
    setDataList([
      {
        text: getLocaleText('blank_page'),
        value: 'blank',
      },
      {
        text: getLocaleText('recommend_page'),
        value: 'recommend',
      },
      {
        text: getLocaleText('custom_page'),
        value: 'custom',
      },
    ]);
    // CSStorage.remove(['newTab']);
    CSStorage.get(['newTab'], response => {
      /** 云端储存 newtab 下的 type 值 */
      const newtab = (response as { newTab: { type: string } }).newTab;
      /** 初始化 type 值 */
      const value = (newtab && newtab.type) || dataList[0].value;
      setOldValue(value);
    });
  }, []);

  /// 显示当前被选择的项
  useEffect(() => {
    dispatch(setTabSelected(OldValue)); /// 上报数据
    setChecked(OldValue);
  }, [OldValue, dataList]);

  return (
    <div ref={radio} className={styles.timeRefresh}>
      {dataList.map(ele => (
        <div key={ele.value}>
          <input
            type="radio"
            name="newTabSelected"
            value={ele.value}
            id={'radio' + ele.value}
          />
          <label
            htmlFor={'radio' + ele.value}
            onClick={() => changeState(ele.value)}
          >
            {ele.text}
          </label>
        </div>
      ))}
    </div>
  );
}
