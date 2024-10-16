/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName error.tsx
 * @CreateDate  周二  10/15/2024
 * @Description new tab 404 页面
 ****************************************************************************/

import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

export function ErrorPage() {
  const navigate = useNavigate();

  const error = useRouteError() as { statusText?: string; message: string };

  return (
    <div>
      <h1>出现了意外</h1>
      <p>{error.statusText || error.message}</p>
      <p onAbort={() => navigate('/')}>回首页</p>
    </div>
  );
}
