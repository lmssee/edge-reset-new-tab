/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tab
 * @FileName index.ts
 * @CreateDate  周二  09/03/2024
 * @Description 新页的逻辑代码，为了与刷新页面的逻辑分开（这是嵌入逻辑）
 *
 *
 ****************************************************************************/
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import createRootElement from 'src/common/createRootElement';
import { setStyle } from 'src/common/element';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
/** 引入公共执行部分 */

import '../content/development';
import store, { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { getLocaleText } from 'src/common/getLocaleText';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
// import { App } from './app';

/** 抓取到根元素 */
const root = createRootElement();
for (const key of ['html', 'body']) {
  (document.querySelector(key) as HTMLElement)!.addEventListener(
    'contextmenu',
    e => {
      e.stopPropagation();
      e.preventDefault();
      window.location.reload();
      return false;
    },
    { capture: false },
  );
}
/// 为了能够复用，在抓到根元素后才赋值
setStyle(root, {
  width: '100%',
  height: '100%',
});

const html = document.querySelector('html')!;

const uiLanguage = chrome.i18n.getUILanguage();
html.lang = uiLanguage.startsWith('zh') ? uiLanguage : 'en';
html.dir = chrome.i18n.getMessage('@@bidi_dir');
/// 新建标签页标题
document.title = getLocaleText('new_tab_title');

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        {/* <App /> */}
      </PersistGate>
    </Provider>
  </StrictMode>,
);
