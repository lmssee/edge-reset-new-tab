/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName loading.tsx
 * @CreateDate  周日  09/29/2024
 * @Description 加载中页面
 ****************************************************************************/

import React from 'react';
import styles from './newtab.module.scss';
import { getLocaleText } from 'src/common/getLocaleText';

/** 中转页面 */
export function Loading() {
  const text = getLocaleText('loading');
  return <div className={`${styles.loading}  colorText`}>{text}....</div>;
}
