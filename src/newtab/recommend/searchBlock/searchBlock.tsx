/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName search.tsx
 * @CreateDate  周六  10/12/2024
 * @Description 搜索框及搜索方式
 ****************************************************************************/

import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { getLocaleText } from 'src/common/getLocaleText';
import { SearchButton } from './searchButton';
import { SearchEngineEle } from './searchEngine';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/newtab/store/storeData';
import { useNavigate } from 'react-router-dom';

export function SearchBlock() {
  /** 检索输入框的值 */
  const [SearchText, setSearchText] = useState<string>('');
  /** 上一次清理的内容 */
  const [LastText, setLastText] = useState<string>('');
  /** 清理已输入的文本 （在 useEffect 中实现清理） */
  const [clearText, setClearText] = useState<boolean>(false);
  /** 恢复已删除的文本 （在另一个 useEffect 中实现恢复） */
  const [recoverText, setRecoverText] = useState<boolean>(false);
  /** 获取输入框元素已在合适的时候能够自动聚焦 */
  const inputRef = useRef<HTMLInputElement>(null);
  /** enter 键按下时的输入框的值 */
  const [isComposing, setIsComposing] = useState<boolean>(false);
  /** 检索信息
   * ```ts
   * 储存在本地的检索信息数据
   * ```ts
   * type SearchSync = {
   *  default: SearchEngine;
   *  list: SearchEngine[];
   *  engine: { [x in SearchEngine]: {
   *      value: SearchEngine;
   *      text: string;
   *      start: string;
   *      end?: string;
   *    };
   *  };
   *}
   * ```
   *
   *
   */
  const searchEngine = useSelector((state: StoreState) => state.searchEngine);

  const navigate = useNavigate();

  /** input 元素聚焦 */
  function inputFocus() {
    inputRef.current?.focus();
  }

  /** 重置已删除的内容 */
  function resetSearchText(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (
      LastText.length > SearchText.length &&
      LastText.startsWith(SearchText)
    ) {
      setRecoverText(true);
    }
  }

  /** 停止重置已删除的文本 */
  function stopResetSearchText() {
    setRecoverText(false);
  }

  /** 逐字恢复已删除的内容 */
  useEffect(() => {
    if (!recoverText) return;
    /** 两者的差值 */
    let str: string = LastText.slice(SearchText.length);
    /** 实际的文本内容 */
    let result: string = SearchText;
    const timeId = setInterval(() => {
      if (str.length > 0) {
        result += str.slice(0, 1);
        str = str.slice(1);
        setSearchText(result);
      } else {
        clearInterval(timeId);
        stopResetSearchText(); /// 清理完毕后更改插值
        inputFocus();
      }
    }, 45);
    /** 清理定时器在需要的时候 */
    return () => clearInterval(timeId);
  }, [recoverText]);

  /** 设置清理模式 */
  function clearSearchText(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    setClearText(true);
    return false;
  }

  /** 停止清理 */
  function stopClearSearchText() {
    setClearText(false);
    return false;
  }

  /** 逐字清理已输入的内容 */
  useEffect(() => {
    if (!clearText) return;
    let str = SearchText;
    setLastText(SearchText);
    const timeId = setInterval(() => {
      if (str.length > 0) {
        str = str.slice(0, -1);
        setSearchText(str);
      } else {
        clearInterval(timeId);
        stopClearSearchText(); /// 清理完毕后更改插值
        inputFocus();
      }
    }, 45);
    /** 清理定时器在需要的时候 */
    return () => clearInterval(timeId);
  }, [clearText]);

  /** 给个小的定时延迟，保证能够捕获到输入框焦点 */
  useEffect(() => {
    const autoFocus = () => {
      inputFocus();
      document.removeEventListener('click', autoFocus);
    };
    document.addEventListener('click', autoFocus);
    return () => document.removeEventListener('click', autoFocus);
  }, []);

  /** 监视当前编辑器输入状态 */
  useEffect(() => {
    const _i = inputRef.current!;

    const handleCompositionStart = () => setIsComposing(true);
    const handleCompositionEnd = () => setIsComposing(false);
    _i.addEventListener('compositionstart', handleCompositionStart);
    _i.addEventListener('compositionend', handleCompositionEnd);
    return () => {
      _i.removeEventListener('compositionstart', handleCompositionStart);
      _i.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, []);

  /** enter 键按下时储存现在的输入框的值  */
  function enterDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (!isComposing) {
        gotoOther();
      }
    }
  }

  /** 检索跳转 */
  function gotoOther() {
    const str = SearchText.trim();
    if (str.length === 0) return;
    searchEngine;
    /** 当前检索信息 */
    const search = searchEngine.engine[searchEngine.current];
    /*** 目标网址 */
    const url = search.start
      .concat(str)
      .concat('&from=lmssee')
      .concat(search.end || '');
    /** 使用 window 打开方式打开的网址 */
    const _url = chrome.runtime
      .getURL('newTab/index.html')
      .concat('#/loading/')
      .concat(encodeURIComponent(url));

    if (searchEngine.target === '_self')
      navigate(`/loading/${encodeURIComponent(url)}`, {});
    else window.open(_url, '_target');
  }

  return (
    <div className={styles.searchBlock}>
      <SearchEngineEle settingFocus={inputFocus} />
      <input
        type="text"
        autoFocus={true}
        placeholder={getLocaleText('tab_search_placeholder')}
        value={SearchText}
        onChange={e => setSearchText(e.target.value)}
        onFocus={stopClearSearchText}
        onContextMenu={resetSearchText}
        onKeyDown={enterDown}
        ref={inputRef}
      />
      <SearchButton value={SearchText} click={gotoOther} />
      {SearchText.length > 0 && <span onClick={clearSearchText}>+</span>}
    </div>
  );
}
