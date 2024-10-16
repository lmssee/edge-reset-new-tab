/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset-new-tav
 * @FileName router.tsx
 * @CreateDate  周二  10/15/2024
 * @Description 路由导航（需求不多，为了使用路由而使用路由）
 ****************************************************************************/

import { createHashRouter } from 'react-router-dom';
import { App } from './app';
import React from 'react';
import { Loading } from './loading';
import { Recommend } from './recommend';
import { BlankPage } from './blankPage';
import { ErrorPage } from './error';

/** 路由 */
const router = createHashRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          { path: 'loading/:url', element: <Loading></Loading> },
          { path: 'recommend', element: <Recommend></Recommend> },
          { index: true, element: <BlankPage></BlankPage> },
        ],
      },
    ],
  },
]);

export { router };
