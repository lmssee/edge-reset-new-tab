/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName searchTarget.tsx
 * @CreateDate  周三  10/16/2024
 * @Description 检索打开的目标设置
 ****************************************************************************/

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreState, storeSyncList } from 'src/newtab/store/storeData';
import { SelectEngine } from '../searchBlock/searchEngine';
import styles from './index.module.scss';
import { getLocaleText } from 'src/common/getLocaleText';
import { CSStorage } from 'src/common';
import { useDispatch } from 'react-redux';

/** 搜索设设定 */
export function SearchSetting() {
  return (
    <div className={styles.searchSetting}>
      <div className={styles.title}>
        {getLocaleText('search_text')}
        {getLocaleText('setting_text')}
      </div>
      <Top />
      <Bottom />
    </div>
  );
}

function Top() {
  return (
    <div>
      <div className={styles.lowTitle}>
        {getLocaleText('search_engine_text')}
      </div>
      <SelectEngine hidden={() => 1} position={{ left: '46px', top: '46px' }} />
    </div>
  );
}

function Bottom() {
  const searchEngine = useSelector((state: StoreState) => state.searchEngine);
  const dispatch = useDispatch();

  /** 触发点击 */
  function change(e: React.MouseEvent, value: string) {
    e.stopPropagation();
    e.preventDefault();
    const target = value as '_self';
    /// 获取值然后再给值
    CSStorage.get(['search'], result => {
      const oldSearch = result['search'] || searchEngine;
      const search = { ...oldSearch, target };
      CSStorage.set({ search }, () => {
        dispatch({
          type: storeSyncList.set_search_engine,
          payload: { target },
        });
        checkEle(target);
      });
    });
  }

  /**  让元素被选择 */
  function checkEle(value: string) {
    (
      document.querySelector(
        `input#searchOpenTarget${value}`,
      ) as HTMLInputElement
    ).checked = true; /// 让元素被选择
  }

  /// 当值改变时触发当前选择变化
  useEffect(() => {
    checkEle(searchEngine.target); ///  让元素被选择
  }, [searchEngine.target]);

  return (
    <div className={styles.searchOpenTarget}>
      <div className={styles.lowTitle}>
        {getLocaleText('search_result_open_target_text')}
      </div>
      <div>
        {['_self', '_blank'].map(e => (
          <div key={e} onClick={_e => change(_e, e)}>
            <input
              type="radio"
              name="selectSearchTarget"
              defaultChecked={e == searchEngine.target}
              id={'searchOpenTarget' + e}
            />
            <label htmlFor={'searchOpenTarget' + e}></label>
            {getLocaleText('search_target'.concat(e))}
          </div>
        ))}
      </div>
    </div>
  );
}
