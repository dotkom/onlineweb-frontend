import { DateTime } from 'luxon';
import { useState } from 'react';

export const useMonth = (initialMonth: DateTime = DateTime.local()): [DateTime, (amount: number) => void] => {
  const [month, setMonth] = useState(initialMonth);

  const changeMonth = (amount: number) => {
    setMonth(month.plus({ months: amount }));
  };

  return [month, changeMonth];
};
