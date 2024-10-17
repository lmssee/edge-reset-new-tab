/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName simple refresh
 * @FileName footer.tsx
 * @CreateDate  周六  09/21/2024
 * @Description 页脚的超链
 ****************************************************************************/

import React, { useState } from 'react';

import styles from './index.module.scss';

import { svgImage } from './images/export_svg';
import { getLocaleText } from 'src/common/getLocaleText';
import { createPortal } from 'react-dom';

/**
 * 页脚的超链展示
 */
export function Footer(): React.JSX.Element {
  const dataList: { href: string; src: string; title: string }[] = [
    {
      title: '🌟🌟',
      src: svgImage.github,
      href: 'https://github.com/lmssee/edge-reset-new-tab',
    },
    {
      title: getLocaleText('email_feedback'),
      src: svgImage.email,
      href: 'mailto:lmssee@outlook.com',
    },
    {
      title: 'letmiseesee',
      src: svgImage.x,
      href: 'https://x.com/letmiseesee',
    },
    {
      title: getLocaleText('bug_feedback'),
      src: svgImage.feedback,
      href: 'https://github.com/lmssee/edge-reset-new-tab/issues/new',
    },
  ];
  /** 当前设置的 title */
  const [currentTitle, setCurrentTitle] = useState('');
  /** 设置的 title 的位置信息 */
  const [position, setPosition] = useState({
    top: '',
    left: '',
  });
  /** 展示 title  */
  const showTitle = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    setCurrentTitle(target.dataset.title!);
    const tarPosition = target.getBoundingClientRect();
    setPosition({
      top: tarPosition.top - tarPosition.height + 'px',
      left: tarPosition.left + 'px',
    });
  };

  return (
    <div className={styles.index}>
      <ul>
        {dataList.map(ele => (
          <li
            key={ele.title}
            data-title={ele.title}
            onMouseEnter={showTitle}
            onMouseLeave={() => setCurrentTitle('')}
          >
            <a href={ele.href} target="_blank" rel="noopener noreferrer">
              <img src={ele.src} alt={ele.title} />
            </a>
          </li>
        ))}
      </ul>
      {currentTitle !== '' &&
        createPortal(
          <div className={`  ${styles.title}`} style={position}>
            {currentTitle}
          </div>,
          document.body,
        )}
    </div>
  );
}
