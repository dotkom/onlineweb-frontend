import React, { FC } from 'react';

import style from './error.less';

type ErrorCode = 401 | 403 | 404;

type Mapping = { [Key in ErrorCode]: string };

const ERROR_MESSAGES: Mapping = {
  401: 'Du må være logget inn for å se denne siden',
  403: 'Du har ikke tilgang til denne siden',
  404: 'Denne siden finnes ikke',
};

const ERROR_IMAGE: Mapping = {
  401: '/img/animations/404balloon.gif',
  403: '/img/animations/403donut.gif',
  404: '/img/animations/404balloon.gif',
};

interface IProps {
  code: ErrorCode;
  text?: string;
}

const HttpError: FC<IProps> = ({ code, text }) => (
  <section>
    <div className={style.header}>
      <h1>{code}</h1>
      <h2> {text || ERROR_MESSAGES[code]}</h2>
      <img src={ERROR_IMAGE[code]} />
    </div>
  </section>
);

export default HttpError;
