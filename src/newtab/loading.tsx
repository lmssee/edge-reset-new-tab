/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName reset new tab
 * @FileName loading.tsx
 * @CreateDate  周日  09/29/2024
 * @Description 加载中页面
 ****************************************************************************/

import React, { useEffect, useState } from 'react';
import styles from './newtab.module.scss';
import { getLocaleText } from 'src/common/getLocaleText';
import { useParams } from 'react-router-dom';

/** 中转页面 */
export function Loading() {
  /** 获取文本 */
  const text = getLocaleText('loading');
  const { url } = useParams();
  const [list, setList] = useState<string[]>([]);

  /** 进入页面加载 */
  useEffect(() => {
    setList([
      ...['parsing_text', 'parsed_done_text', 'ready_to_jump_text'].map(e =>
        getLocaleText(e).concat('...'),
      ),
      url as string,
    ]);
    const timeId = setTimeout(() => {
      window.location.replace(url as string);
    }, 100);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div className={`${styles.loading}`}>
      <div className="colorText">{text}....</div>
      {(list.length && <PrintText list={list} />) || <></>}
    </div>
  );
}
/**  需要加载到页面的文本 */
function PrintText(props: {
  /** 加载的文本信息 */
  list: string[];
}) {
  /// 当前展示文本
  const [text, setText] = useState('');
  //// 开始展示下一个
  const [nest, setNest] = useState(false);

  /** 逐字恢复已删除的内容 */
  useEffect(() => {
    /** 实际（当前展示）的文本内容 */
    let str: string = '';
    /** 剩余的文本 */
    let result: string = props.list[0];
    if (!result || !result.length) return;
    const timeId = setInterval(() => {
      if (result.length > 0) {
        str += result.slice(0, 1);
        result = result.slice(1);
        setText(str);
      } else {
        clearInterval(timeId); //// 真是个大聪明，这都能耽搁两钟头
        if (props.list.length > 2) setNest(true);
      }
    }, 50);
    /** 清理定时器在需要的时候 */
    return () => clearInterval(timeId);
  }, []);

  return (
    <>
      <div>{text}</div>
      {nest && props.list.length > 2 && (
        <PrintText list={props.list.slice(1) || []} />
      )}
    </>
  );
}
