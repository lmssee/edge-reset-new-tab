/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName types.ts
 * @CreateDate  周日  09/29/2024
 * @Description 云端储存数据相关类型
 *
 *
 * 添加云端数据类型的时候
 *
 * 记得将其添加到 get、set 列表及 onchange 列表
 ****************************************************************************/

/** contextMenu 值 */
export type ContextMenuValue = {
  visibility: 'visible' | 'hidden' | undefined;
};

/** newTab 值 type 当前的类型，目前仅有三种
 *
 * - blank         空白页面
 * - recommend     推荐页
 * - custom        自定义页面
 */
export type NewTabValueType = 'blank' | 'recommend' | 'custom';

/** newTab 值
 *
 *
 * - type 当前的类型，目前仅有三种
 *      - blank         空白页面
 *      - recommend     推荐页
 *      - custom        自定义页面
 * - url  自定义的 url 地址
 */
export type NewTabValue = {
  /**  */
  type?: NewTabValueType;
  /** 自定义的 url 地址 */
  url?: string;
};

/** 搜索暂时引擎
 *
 * *需保证该值能在 newtab 的 recommend 中有匹配的 png 图片*
 */
export type SearchEngine =
  | 'baidu'
  | 360
  | 'bing'
  | 'sogou'
  | 'yandex'
  | 'google';

/**
 *  ## 检索的相关
 *
 * - default 当前使用的检索引擎
 * - list    检索引擎列表
 * - engine  具体检索引擎的数据信息
 */

export type SearchSync = {
  default: SearchEngine;
  list: SearchEngine[];
  engine: {
    [x in SearchEngine]: {
      value: string | 360;
      text: string;
      start: string;
      end?: string;
    };
  };
};

/** recommend 的 url 列队值基本子项 */
export type URLItem = {
  /** 连接地址 */
  url: string;
  /** 展示文本 */
  text: string;
  /** 默认头像 */
  defaultIcoImg: string;
  /** 当前可见性 */
  visibility: 'visible' | 'hidden';
};

/** recommend 的 url 列队值 */
export type URLList = {
  /** 无限包含的列 */
  [x: string]: {
    /** 列表项 */
    list: (URLItem | URLList)[];
    /** 可见性 */
    visibility: 'visible' | 'hidden';
    /** 小组名称 */
    name: '';
    /** 小组的 key 值
     *
     * 用于右键的添加
     */
    key: string;
    /** 父级的 key 值 */
    parentKey: string;
  };
};

/**  当前储存的 key 值
 *
 *
 * - 当前储存 key 值
 * - 启始值为 "9863"
 * - 终止值为 "9953"
 */
export type URLLastKey = string;

/**
 *  get 及 remove 的 key值列表
 */
export type SyncKeyList =
  | 'contextMenu'
  | 'newTab'
  | 'urlList'
  | 'urlLastKey'
  | 'search';

/** `chrome.storage.sync` 的值类型  */
export type CmStorageSyncValue = {
  /** 右键储存在云端的数据 */
  contextMenu?: ContextMenuValue;
  /** 储存在云端的新标签页需要的数据
   *
   * 主要用于 popup 弹窗和 newtab 页面的类型 */
  newTab?: NewTabValue;
  /**
   *  检索信息
   */

  search?: SearchSync;
  /**  储存的网址收藏列表
   *
   * 主要用于 recommend 页面展示
   */
  urlList?: URLList;
  /**  当前储存的 key 值
   *
   *
   * - 当前储存 key 值
   * - 启始值为 "9863"
   * - 终止值为 "9953"
   */
  urlLastKey?: URLLastKey;
};

/**
 * 监听数据变化时数据
 */
export type CmStorageChanged = {
  /** 右键储存在云端的数据 */
  contextMenu?: {
    newValue: ContextMenuValue;
    oldValue: ContextMenuValue;
  };
  /** 储存在云端的新标签页需要的数据
   *
   * 主要用于 popup 弹窗和 newtab 页面的类型 */
  newTab?: {
    newValue: NewTabValue;
    oldValue: NewTabValue;
  };
  /**
   *  检索信息
   */

  search?: {
    newValue: SearchSync;
    oldValue: SearchSync;
  };
  /**  储存的网址收藏列表
   *
   * 主要用于 recommend 页面展示
   */
  urlList?: {
    newValue: URLList;
    oldValue: URLList;
  };
  /**  当前储存的 key 值
   *
   *
   * - 当前储存 key 值
   * - 启始值为 "9863"
   * - 终止值为 "9953"
   */
  urlLastKey?: {
    newValue: URLLastKey;
    oldValue: URLLastKey;
  };
};
