import React, { useEffect } from 'react';
import '../css/common.scss';
import { CLChanged } from 'src/common';
// import { useSelector } from 'react-redux';
// import { StoreState, storeSyncList } from './store/storeData';
import { useDispatch } from 'react-redux';
import { CSStorage } from 'src/common/chromeSStorage';
import { NewTabValue } from 'src/common/types';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { storeSyncList } from './store/storeData';

/** 根元素 */
export function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /** 设置新的值且切换路由，发生在初始化或当前页面展示时接收到变化值 */
  function routerChange(value: NewTabValue) {
    {
      /* {(url !== '' && pageState === 'custom' && <Loading />) ||
        (pageState === 'recommend' && <Recommend />) || <BlankPage />} */
    }
    const selected = value.type;
    const url = value.url;
    /// 设定新的值
    dispatch({
      type: storeSyncList.init_new_tab_info,
      payload: { selected, url },
    });

    /// 转向设定的网址
    if (selected === 'custom' && url)
      navigate(`loading/${encodeURIComponent(url)}`);
    else if (selected === 'blank') navigate('/');
    else navigate('recommend');
  }

  // const a = 'car';
  // const b = 'cat';
  // a.slice(
  //   0,
  //   a.split('').findIndex((value, index) => b[index] !== value),
  // );

  /** ico 配置 */
  useEffect(() => {
    const ico = document.createElement('link');
    ico.rel = 'icon';
    ico.href = '../icons/favicon.ico';
    document.head.appendChild(ico);
  }, []);

  useEffect(() => {
    /// 非空进入即为目的的进入页面，不干涉路由的正常跳转
    if (location.pathname !== '/') return;
    /** 获取云端储存数据 */
    CSStorage.get(['newTab'], response => {
      routerChange(response.newTab || {});
    });
    /** 在这里监听储存数据的变化 */
    CLChanged((pref, areaName: string) => {
      const newtab = pref.newTab;
      /// 仅关心有效云端数据的改变
      if (areaName !== 'sync' || !newtab) return;
      routerChange(newtab.newValue);
    });
  }, []);

  return <Outlet></Outlet>;
}
