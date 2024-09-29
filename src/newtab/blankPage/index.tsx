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
import { getLocaleText } from 'src/common/getLocaleText';

export function BlankPage() {
  const [timeShow, setTimeShow] = useState({
    time: '',
    day: '',
  });

  function getTime() {
    const now = new Date();
    setTimeShow({
      time: now.toLocaleString(),
      day: getLocaleText(
        [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ][now.getDay()],
      ),
    });
  }

  useLayoutEffect(() => {
    if (timeShow.time === '') getTime();

    const timeId = setInterval(() => {
      getTime();
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
