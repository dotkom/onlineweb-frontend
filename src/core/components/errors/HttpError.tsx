import Img from 'common/components/Img';
import React from 'react';
import style from './error.less';

export type ErrorCode = 401 | 403 | 404;

export interface IProps {
  code: ErrorCode;
  text?: string;
}

const NotFound = ({ code, text }: IProps) => (
  <section>
    <div className={style.header}>
      <h1>{code}</h1>
      <h2> {text || 'Siden du har bedt om finnes ikke.'}</h2>
      <Img src="/static/img/404Balloon.gif" />
    </div>
  </section>
);

export default NotFound;
