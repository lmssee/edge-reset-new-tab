/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName searchButton.tsx
 * @CreateDate  周日  10/13/2024
 * @Description 输入框右侧的按钮
 ****************************************************************************/

import React from 'react';
import { useEffect, useState } from 'react';
import { getLocaleText } from 'src/common/getLocaleText';

/**
 * 输入按钮的参数类型
 *
 * - value 输入框的值
 * - click 点击触发的回调
 *
 */
type Props = {
  /**  输入框的值 */
  value: string;
  /** 点击回调 */
  click?: () => void;
};

/** 搜索按钮
 *
 * - 在未输入内容时
 *    - 字色样式  #366
 *    - 光标样式  unset
 * - 输入内容后
 *    - 字色样式  #0ff
 *    - 光标样式  pointer
 */
export function SearchButton(props: Props) {
  const [style, setStyle] = useState<{ color?: string; cursor?: string }>({});

  /** 根据输入框信息更改文本的颜色样式 */
  useEffect(() => {
    if (props.value.trim().length > 0)
      setStyle({
        color: 'transparent',
        cursor: 'pointer',
      });
    else
      setStyle({
        color: '#366',
        cursor: 'unset',
      });
  }, [props.value]);

  return (
    <input
      type="button"
      style={style}
      value={getLocaleText('search_text')}
      onClick={props.click}
    />
  );
}
