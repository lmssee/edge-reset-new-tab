/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName searchEngine.tsx
 * @CreateDate  周日  10/13/2024
 * @Description 搜索引擎设定
 ****************************************************************************/

import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { createPortal } from 'react-dom';
import { searchLogo } from './image/searchLogo';
import { useSelector } from 'react-redux';
import { StoreState, storeSyncList } from 'src/newtab/store/storeData';
import { SearchEngine } from 'src/common/types';
import { CSStorage } from 'src/common';
import { useDispatch } from 'react-redux';

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
  /** 展示方式
   *
   * - row              默认值，水平方向
   * - column           垂直方向
   * - row-reverse      水平方向从右向左排列
   * - column-reserve   垂直方向冲下向上排列
   *
   */
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
};

/** 搜索前的图标 */
export function SearchEngineEle(props: {
  /** 使输入框聚焦 */
  settingFocus: () => void;
}) {
  /** 获取当前的检索信息  */
  const searchEngine = useSelector((state: StoreState) => state.searchEngine);
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
    props.settingFocus(); /// 使输入框聚焦
  }

  return (
    <>
      <input
        type="image"
        src={searchLogo[searchEngine.default]}
        alt="16*16"
        ref={input}
        // onMouseEnter={showEngine}
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
export function SelectEngine(props: {
  hidden: () => void;
  position: EnginePosition;
}) {
  /** 储存在 redux 的数据
   *
   * 该数据由云端和本地共同管理
   *
   * 储存在本地的检索信息数据
   * ```ts
   *    type SearchSync = {
   *     default: SearchEngine;
   *     list: SearchEngine[];
   *     engine: { [x in SearchEngine]: {
   *         value: SearchEngine;
   *         text: string;
   *         start: string;
   *         end?: string;
   *            };
   *       };
   *   }
   * ```
   * */
  const engineList = useSelector((state: StoreState) => state.searchEngine);

  const dispatch = useDispatch();

  const [timeId, setTimeId] = useState<NodeJS.Timeout>();

  /** 触发点击 */
  function click(
    e: React.MouseEvent,
    data: {
      value: SearchEngine;
    },
  ) {
    e.preventDefault();
    e.stopPropagation();
    /// 获取值然后再给值
    CSStorage.get(['search'], result => {
      const oldSearch = result['search'] || engineList;
      const list = [...new Set([data.value, ...oldSearch.list])];
      const search = { ...oldSearch, list, default: data.value };
      CSStorage.set({ search }, () => {
        dispatch({
          type: storeSyncList.set_search_engine,
          payload: { default: data.value, list },
        });

        setTimeId(
          setTimeout(() => {
            props.hidden();
          }, 600),
        );
      });
    });
  }
  /**  让元素被选择 */
  function checkEle(value: string | number) {
    (
      document.querySelector(`input#searchEngine${value}`) as HTMLInputElement
    ).checked = true; /// 让元素被选择
  }

  /// 清理未完成的定时器
  useEffect(() => {
    return () => {
      if (timeId) clearTimeout(timeId);
    };
  }, []);

  /// 当值改变时触发当前选择变化
  useEffect(() => {
    checkEle(engineList.default); ///  让元素被选择
  }, [engineList.default]);

  return (
    <div
      className={styles.selectEngine}
      style={props.position}
      onMouseLeave={props.hidden}
    >
      {engineList.list.map(_e => {
        const e = engineList.engine[_e];
        return (
          <div key={e.text} onClickCapture={event => click(event, e)}>
            <div>
              <input
                type="radio"
                name="selectSearchEngine"
                defaultChecked={e.value === engineList.default}
                id={'searchEngine' + e.value}
              />
              <label htmlFor={'searchEngine' + e.value}></label>
            </div>
            <div>
              <img src={searchLogo[e.value]} alt={e.text} title={e.text} />
            </div>
            <div>{e.text}</div>
          </div>
        );
      })}
    </div>
  );
}
