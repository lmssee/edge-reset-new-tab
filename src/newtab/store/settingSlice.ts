/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName searchEngine.ts
 * @CreateDate  周六  09/21/2024
 * @Description 配置设置弹窗是否弹起
 ****************************************************************************/

import { createSlice } from '@reduxjs/toolkit';

/** 初始化数据 */
const initialState = {
  /** 展示设置 */
  show: true,
};

/** # 标签信息
 *
 *
 */
export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    /** 设置默认的检索引擎 */
    setSettingCover: (state, action) => {
      state.show = action.payload;
    },
  },
});

/** 导出动作 */
export const { setSettingCover } = settingSlice.actions;

export default settingSlice.reducer;
