/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName init.ts
 * @CreateDate  周一  09/16/2024
 * @Description 初始化当前多前多国语言设置
 ****************************************************************************/

import { CRuntime } from 'src/common';

export function askDefaultLanguage() {
  /// 查询当前使用的默认语言设定
  CRuntime.sendMessage(
    {
      form: 'internationalization',
      to: 'backgroundJS',
      type: 'askDefaultLanguage',
    },
    (_r: unknown) => {
      const result = _r;
      console.log('====================================');
      console.log(result);
      console.log('====================================');
      result;
    },
  );
}
