import { DateTime } from 'luxon';
import React from 'react';
import style from './detail.less';

export interface IProps {
  time: DateTime;
  format?: string;
}

const FORMAT = 'd. MMM HH:mm';

export const DisplayTime = ({ time, format = FORMAT }: IProps) => {
  const formattedTime = time.toFormat(format);
  return <p className={style.capitalized}>{formattedTime}</p>;
};

export default DisplayTime;
