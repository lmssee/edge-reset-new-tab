/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName timeShow.tsx
 * @CreateDate  周六  10/12/2024
 * @Description 推荐页输入框上的时间显示
 ****************************************************************************/

import React, { useEffect, useState } from 'react';
import { getTime } from '../tools';
import styles from './index.module.scss';

export function TimeShow() {
  /** 获取时间 */
  const [time, setTime] = useState<{ time: string; day: string }>(getTime());
  useEffect(() => {
    const timeId = setInterval(() => setTime(getTime()), 1000);

    return () => clearInterval(timeId);
  }, []);

  return (
    <div className={`${styles.time}`}>
      <div>{time.time}</div>
      <div className="colorText">{time.day}</div>
    </div>
  );
}
