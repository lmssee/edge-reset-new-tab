import React, { useEffect } from 'react';
import '../css/common.scss';
import { CLChanged } from 'src/common';
import { BlankPage } from './blankPage';
import { useSelector } from 'react-redux';
import { StoreState, storeSyncList } from './store/storeData';
import { useDispatch } from 'react-redux';
import { CSStorage, newTabValueT } from 'src/common/chromeSStorage';
import { Loading } from './loading';

/** 根元素 */
export function App() {
  /**
   * 当前选择的项
   *
   * - blank 空白项
   * - recommend 推荐项
   * - custom 自定义项
   */
  const pageState = useSelector((state: StoreState) => state.tab.selected) as
    | 'blank'
    | 'recommend'
    | 'custom';

  /** 自定义的网址 */
  const url = useSelector((state: StoreState) => state.tab.custom);

  const dispatch = useDispatch();

  /** 设置新的值，发生在初始化或当前页面展示时接收到变化值 */
  function setValue(value: newTabValueT) {
    const selected = value.type;
    const url = value.url;
    /// 设定新的值
    dispatch({
      type: storeSyncList.init_new_tab_info,
      payload: { selected, url },
    });
    if (selected === 'custom' && url) window.location.replace(url);
    // setTimeout(() => window.location.replace(url), 1200);
  }

  /** ico 配置 */
  useEffect(() => {
    const ico = document.createElement('link');
    ico.rel = 'icon';
    ico.href = '../icons/favicon.ico';
    document.head.appendChild(ico);
  }, []);

  useEffect(() => {
    /** 获取云端储存数据 */
    CSStorage.get(['newTab'], response => {
      setValue(response.newTab || {});
    });
    /** 在这里监听储存数据的变化 */
    CLChanged((pref, areaName: string) => {
      const newtab = pref.newTab;
      /// 仅关心有效云端数据的改变
      if (areaName !== 'sync' || !newtab) return;
      setValue(newtab.newValue);
    });
  }, []);

  return (
    <>
      {(url !== '' && pageState === 'custom' && <Loading />) ||
        (pageState === 'blank' && <BlankPage />) ||
        pageState}
    </>
  );
}
