/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName tabSlice.ts
 * @CreateDate  周六  09/21/2024
 * @Description 窗口数据中心
 ****************************************************************************/

import { createSlice } from '@reduxjs/toolkit';
import { storeSyncList } from './storeData';
import { NewTabValueType } from 'src/common/types';

/** 初始化数据 */
const initialState: {
  /** 当前选择的项
   *
   *  -  `blank`      空白项
   *  -  `recommend`  推荐项
   *  -  `custom`     自定义项
   */
  selected: NewTabValueType;
  /** 自定项被选择时的值 */
  custom: string;
} = {
  selected: 'blank',
  custom: '',
};

/** # 标签信息
 *
 *
 */
export const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setTabSelected: (state, action) => {
      state.selected = action.payload;
    },
    setTabCustomUrl: (state, action) => {
      state.custom = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      storeSyncList.init_new_tab_info,
      (state, action: unknown) => {
        const payload = (
          action as {
            payload: {
              selected: NewTabValueType;
              url: string;
            };
          }
        ).payload;
        state.selected = payload.selected;
        state.custom = payload.url;
      },
    );
  },
});

/** 导出动作 */
export const { setTabSelected, setTabCustomUrl } = tabSlice.actions;

export default tabSlice.reducer;
