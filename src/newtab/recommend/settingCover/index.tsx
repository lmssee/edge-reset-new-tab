/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName index.tsx
 * @CreateDate  周三  10/16/2024
 * @Description 设置页面
 ****************************************************************************/

import React from 'react';
import styles from './index.module.scss';
import { createPortal } from 'react-dom';
// import { useSelector } from 'react-redux';
// import { StoreState } from 'src/newtab/store/storeData';
import { useDispatch } from 'react-redux';
import { setSettingCover } from 'src/newtab/store/settingSlice';
import { SearchSetting } from './searchSetting';

/** 设置页面的展示 */
export function SettingCover() {
  /** 设置 */
  // const settingCover = useSelector((state: StoreState) => state.setting);
  const dispatch = useDispatch();
  /** 隐藏设置弹窗 */
  function hiddenCover() {
    dispatch(setSettingCover(false));
  }

  /**  */
  function nothing(e: React.MouseEvent) {
    e.stopPropagation();
  }

  return createPortal(
    <div className={styles.settingCover} onClick={hiddenCover}>
      <div className="center" onClick={nothing}>
        <div className={styles.closeButton} onClick={hiddenCover}>
          +
        </div>
        <SearchSetting />
      </div>
    </div>,
    document.body,
  );
}
