/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName tools.ts
 * @CreateDate  周六  10/12/2024
 * @Description 工具函数
 ****************************************************************************/

import { getLocaleText } from 'src/common/getLocaleText';

/**  获取时间 */
export function getTime() {
  const now = new Date();
  return {
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
  };
}
