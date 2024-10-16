/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName index.tsx
 * @CreateDate  周日  09/29/2024
 * @Description
 ****************************************************************************/

import React, { useEffect } from 'react';
import { getLocaleText } from 'src/common/getLocaleText';
import styles from './index.module.scss';
import { TimeShow } from './timeShow';
import { SearchBlock } from './searchBlock/searchBlock';
import { useSelector } from 'react-redux';
import { StoreState, storeSyncList } from '../store/storeData';
import { CSStorage } from 'src/common';
import { useDispatch } from 'react-redux';
import { SettingCover } from './settingCover/index';

export function Recommend() {
  /** 获取当前检索信息 */
  const searchEngine = useSelector((state: StoreState) => state.searchEngine);
  /** 设置页面 */
  const settingShow = useSelector((state: StoreState) => state.setting);

  const dispatch = useDispatch();

  document.title = getLocaleText('recommend_title'); // 设置网页的标题

  /** 初始化云端数据
   *
   * 放在这里初始化主要是这个文件没啥东西
   */
  useEffect(() => {
    CSStorage.get(['search'], result => {
      /// 没有数据则初始化数据
      if (!result['search']) {
        CSStorage.set({ search: searchEngine });
        return;
      }
      /** 所有数据，以本地储存信息为蓝本，若版本一致，则云端替代本地，否则执行其他更改 */
      /*** 有值则在这里初始化本地数据并且比对版本内容的变化 */
      const search = result['search'];

      dispatch({
        type: storeSyncList.set_search_engine,
        payload: { default: search.default, list: search.list },
      });
    });
  }, []);

  return (
    <div className={styles.main}>
      <TimeShow />
      <div style={{ clear: 'both' }}></div>
      <SearchBlock />
      {settingShow.show && <SettingCover />}
    </div>
  );
}
