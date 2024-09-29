import React from 'react';
import { Footer } from './footer';
import { getLocaleText } from 'src/common/getLocaleText';
import '../css/common.scss';
import '../css/product.scss';
import { RadioBlock } from './selectedRadio';
import { useSelector } from 'react-redux';
import { StoreState } from './store/storeData';
import { CustomUrl } from './customUrl';

/** 根元素 */
export function App() {
  /** 当前页面的选择 */
  const pageState = useSelector((state: StoreState) => state.tab.selected);
  /** 设定 h1 本地化文本 */
  const h1Text = getLocaleText('popup_h1');

  return (
    <>
      <h1 className="textInOneLineHide">{h1Text}</h1>
      <RadioBlock />
      {pageState == 'custom' && <CustomUrl />}
      <Footer></Footer>
    </>
  );
}
