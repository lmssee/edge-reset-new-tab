/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tav
 * @FileName searchLogo.ts
 * @CreateDate  周一  10/14/2024
 * @Description 导出搜索引擎的图标
 ****************************************************************************/
import baidu from './baidu.png';
import t60 from './360.png';
import bing from './bing.png';
import google from './google.png';
import sogou from './sogou.png';
import yandex from './yandex.png';

/**
 * 导出相应的图标信息
 *
 */
export const searchLogo: { [x: string]: string } = {
  /** 百度 */
  baidu,
  /** bing */
  bing,
  /** google */
  google,
  /** sogou */
  sogou,
  /** yandex */
  yandex,
  /** 360 */
  360: t60,
};
