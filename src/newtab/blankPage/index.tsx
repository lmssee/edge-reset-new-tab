/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName blankPage.tsx
 * @CreateDate  周五  09/27/2024
 * @Description 空白页面，用于用户设定
 ****************************************************************************/

import React, { useLayoutEffect, useState } from 'react';
import styles from './blank.module.scss';
import { getTime } from '../tools';

export function BlankPage() {
  const [timeShow, setTimeShow] = useState({
    time: '',
    day: '',
  });

  /** 设定时间 */
  function setTime() {
    setTimeShow(getTime());
  }

  useLayoutEffect(() => {
    if (timeShow.time === '') setTime();

    const timeId = setInterval(() => {
      setTime();
    }, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  return (
    <div className={styles.blankPage}>
      <div>{timeShow.time}</div>
      <div>{timeShow.day}</div>
    </div>
  );
}
