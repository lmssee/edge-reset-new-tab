/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName searchEngine.tsx
 * @CreateDate  周日  10/13/2024
 * @Description 搜索引擎设定
 ****************************************************************************/

import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import { createPortal } from 'react-dom';
import { searchLogo } from './image/searchLogo';

const engineList: { text: string; value: string }[] = [
  {
    value: 'baidu',
    text: '百度',
  },
  {
    value: '360',
    text: '360',
  },
  {
    value: 'bing',
    text: 'bing',
  },
  {
    value: 'sogou',
    text: '搜狗',
  },
  {
    value: 'yandex',
    text: 'yandex',
  },
  {
    value: 'google',
    text: 'google',
  },
];
/***
 *  弹出浮窗的位置
 *
 * - left 左侧
 * - top  距离顶部的距离
 *
 */
type EnginePosition = {
  /** 左侧 */
  left: string;
  /** 顶部 */
  top: string;
};

/** 搜索前的图标 */
export function SearchEngine(props: { settingFocus: () => void }) {
  /** input 元素 */
  const input = useRef<HTMLInputElement>(null);
  /** 是否展示当前搜索引擎 */
  const [ShowEngineSelect, setShowEngineSelect] = useState<boolean>(false);
  /** 弹出浮窗的位置 */
  const [Position, setPosition] = useState<EnginePosition>({
    left: '0px',
    top: '0px',
  });

  /** 展示引擎模块 */
  function showEngine() {
    if (!input.current) return;
    /** 获取当前元素的位置信息 */
    const p = input.current.getBoundingClientRect();
    setPosition({
      left: p.left - 2 + 'px',
      top: p.top + 'px',
    });
    setShowEngineSelect(true);
  }

  /** 隐藏检索引擎列表  */
  function hiddenEngine() {
    setShowEngineSelect(false);
    props.settingFocus(); /// 给输入框聚焦
  }

  return (
    <>
      <input
        type="image"
        src="../../icons/ico@16x16.png"
        alt="16*16"
        ref={input}
        onMouseEnter={showEngine}
        onClick={showEngine}
      />
      {ShowEngineSelect &&
        createPortal(
          <SelectEngine hidden={hiddenEngine} position={Position} />,
          document.body,
        )}
    </>
  );
}

/** 选择检索引擎 */
function SelectEngine(props: {
  hidden?: () => void;
  position: EnginePosition;
}) {
  return (
    <div
      className={styles.selectEngine}
      style={props.position}
      onMouseLeave={props.hidden}
    >
      {engineList.map(e => (
        <div key={e.text}>
          <div>
            <input
              type="radio"
              name="selectSearchEngine"
              id={'searchEngine' + (e.value || e.text)}
            />
            <label htmlFor={'searchEngine' + (e.value || e.text)}></label>
          </div>
          <div>
            <img src={searchLogo[e.value]} alt={e.text} title={e.text} />
          </div>
          <div>{e.text}</div>
        </div>
      ))}
    </div>
  );
}
