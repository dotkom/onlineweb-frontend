import { faChevronCircleLeft as ChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronCircleLeft';
import { faChevronCircleRight as ChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronCircleRight';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';

import style from './calendar.less';

export interface IProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export const MonthChanger = ({ direction, onClick }: IProps) => {
  const icon = direction === 'right' ? ChevronRight : ChevronLeft;
  return (
    <div className={style.monthChanger} onClick={onClick} tabIndex={0}>
      <Icon icon={icon} />
    </div>
  );
};
