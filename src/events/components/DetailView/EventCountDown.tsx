import { DateTime } from 'luxon';
import React from 'react';

import { CountDown } from 'common/components/Counter/CountDown';
import { useDateTimeout } from 'common/hooks/useTimeout';
import { DisplayTime } from './DisplayTime';

export interface IProps {
  startOffset?: number;
  endTime: DateTime;
}

const OFFSET = 15 * 60 * 1000; // 15 minutes

export const EventCountDown = ({ startOffset = OFFSET, endTime }: IProps) => {
  const startTime = endTime.minus({ milliseconds: startOffset });

  const started = useDateTimeout(startTime);
  const finished = useDateTimeout(endTime);

  if (started && !finished) {
    return (
      <p>
        <CountDown endTime={endTime} />
      </p>
    );
  } else {
    return <DisplayTime time={endTime} />;
  }
};
