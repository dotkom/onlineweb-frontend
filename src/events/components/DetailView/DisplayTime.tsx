import { DateTime } from 'luxon';
import React from 'react';

export interface IProps {
  time: DateTime;
  format?: string;
}

const FORMAT = 'd MMM HH:mm';

export const DisplayTime = ({ time, format = FORMAT }: IProps) => {
  const formattedTime = time.toFormat(format);
  return <p>{formattedTime}</p>;
};

export default DisplayTime;
