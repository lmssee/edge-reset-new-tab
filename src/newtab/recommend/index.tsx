/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName index.tsx
 * @CreateDate  周日  09/29/2024
 * @Description
 ****************************************************************************/

import React from 'react';
import { getLocaleText } from 'src/common/getLocaleText';
import styles from './index.module.scss';

export function Recommend() {
  document.title = getLocaleText('recommend_title');

  return <div className={styles.main}>

  

  </div>;
}
