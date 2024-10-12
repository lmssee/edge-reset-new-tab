declare module '*index.module.scss' {
  const classes: {
    [key: string]: string;
  };
  /** 页面，在弹窗口使用 */
  export default classes;
}

declare module '*newtab.module.scss' {
  const classes: {
    /** 页面，在弹窗口使用 */
    loading: string;
  };
  export default classes;
}

declare module '*blank.module.scss' {
  const classes: {
    blankPage: string;
  };
  export default classes;
}

/** popup 的页面样式 */
declare module '*popup.module.scss' {
  const classes: {
    /** 刷新块 */
    timeRefresh: string;
    /** popup 输入框 */
    popupInputParent: string;
  };

  export default classes;
}

declare module 'redux-persist/es/storage';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
