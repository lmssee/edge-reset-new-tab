/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName store.ts
 * @CreateDate  周六  09/21/2024
 * @Description redux store
 ****************************************************************************/
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tabReducer from './tabSlice';

/**  创建储存到本的的配置信息 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['tab'],
};

const reducer = { tab: tabReducer };

/** 创建需要储存到本地的数据 */
const rootReducer = persistReducer(
  persistConfig,
  /** 包装后的 reducers  */
  combineReducers(reducer),
  // combineReducers({ tab: tabReducer }),
);

/** 构建数据池
 *
 * 使用示例
 * ```tsx
 *   <StrictMode>
 *    {/*  我被用在这里  *\/}
 *    <Provider store={store}>
 *      <PersistGate loading={null} persistor={persistor}>
 *        <App />
 *      </PersistGate>
 *    </Provider>
 *  </StrictMode>,
 * ```
 */
const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
  // reducer,
});

/** 导出构建本地存储的数据
 *
 * 使用示例：
 * ```tsx
 *   <StrictMode>
 *    <Provider store={store}>
 *       \{\/*  我被用在这里  *\/}
 *      <PersistGate loading={null} persistor={persistor}>
 *        <App />
 *      </PersistGate>
 *    </Provider>
 *  </StrictMode>,
 * ```
 *
 */
export const persistor = persistStore(store);

export default store;
