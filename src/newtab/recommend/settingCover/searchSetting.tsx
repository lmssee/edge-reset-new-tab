/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName searchTarget.tsx
 * @CreateDate  周三  10/16/2024
 * @Description 检索打开的目标设置
 ****************************************************************************/

import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/newtab/store/storeData';
import { SelectEngine } from '../searchBlock/searchEngine';
import styles from './index.module.scss';
import { getLocaleText } from 'src/common/getLocaleText';

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
  console.log('====================================');
  console.log(searchEngine);
  console.log('====================================');
  return (
    <div>
      <div className={styles.lowTitle}>检索打开方式：</div>
      <div>
        {['_self', '_blank'].map(e => (
          <div key={e}>
            <input
              type="radio"
              name="selectSearchEngine"
              defaultChecked={e === searchEngine.target}
              id={'searchEngine' + e}
            />
            <label htmlFor={'searchEngine' + e}>
              {getLocaleText('search_target'.concat(e))}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
