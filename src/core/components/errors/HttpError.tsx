import React from 'react';
import Img from 'common/components/Img';
import Header from 'frontpage/components/Header';
import style from './error.less';

export type ErrorCode = 401 | 403 | 404;

export interface IProps {
  code: ErrorCode;
  text?: string;
}

const errorString = (code: ErrorCode): string => {
  switch (code) {
    case(404): return 'Page not found';
    default: return '';
  }
};

const NotFound = ({ code, text }: IProps) => (
  <section id="error">
    <div className="container">
      <div className={style.header}>
        <h1>{code}</h1>
        <p> { text || 'Siden du har bedt om finnes ikke.' }</p>
        <Img src="/static/img/404Balloon.gif" />
      </div>
    </div>
  </section>
);

export default NotFound;
