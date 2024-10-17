/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName searchEngine.ts
 * @CreateDate  周六  09/21/2024
 * @Description 检索引擎相关数据
 ****************************************************************************/

import { createSlice } from '@reduxjs/toolkit';
import { storeSyncList } from './storeData';
import { SearchEngine, SearchSync } from 'src/common/types';

/** 初始化数据 */
const initialState: SearchSync = {
  current: 'baidu',
  target: '_self',
  list: ['bing', 'baidu', 'google', 'yandex', 'sogou', 360],
  engine: {
    baidu: {
      value: 'baidu',
      text: '百度',
      start: 'https://www.baidu.com/s?wd=',
    },
    360: {
      value: 360,
      text: '360',
      start: 'https://www.so.com/s?q=',
    },
    bing: {
      value: 'bing',
      text: 'bing',
      start: 'https://cn.bing.com/search?q=',
    },
    google: {
      value: 'google',
      text: 'google',
      start: 'https://www.google.com/search?q=',
    },
    yandex: {
      value: 'yandex',
      text: 'yandex',
      start: 'https://yandex.com/search/?text=',
    },
    sogou: {
      value: 'sogou',
      text: 'sogou',
      start: 'https://www.sogou.com/web?query=',
    },
  },
};

/** # 标签信息
 *
 *
 */
export const searchEngineSlice = createSlice({
  name: 'searchEngine',
  initialState,
  reducers: {
    /** 设置默认的检索引擎 */
    setSearchEngineDefault: (state, action) => {
      state.current = action.payload;
    },
    /** 设定默认的检索列表，有序 */
    setSearchEngineList: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: builder => {
    /** 添加异步设置当前的选择项 */
    builder.addCase(
      storeSyncList.set_search_engine,
      (state, action: unknown) => {
        const payload = (
          action as {
            payload: {
              current?: SearchEngine;
              list?: SearchEngine[];
              target: '_blank' | '_self';
            };
          }
        ).payload;
        if (payload) {
          if (payload.current) state.current = payload.current;
          if (payload.list) state.list = payload.list;
          if (payload.target) state.target = payload.target;
        }
      },
    );
  },
});

/** 导出动作 */
export const { setSearchEngineDefault, setSearchEngineList } =
  searchEngineSlice.actions;

export default searchEngineSlice.reducer;
