import { DateTime } from 'luxon';
import React from 'react';

import { useCountDown } from 'common/hooks/useCountDown';

export interface IProps {
  endTime: DateTime;
  format?: string;
}

const FORMAT = 'mm:ss';

export const CountDown = ({ endTime, format = FORMAT }: IProps) => {
  const remaining = useCountDown(endTime);
  const formatted = DateTime.fromMillis(remaining * 1000).toFormat(format);
  return <>{formatted}</>;
};

export default CountDown;
