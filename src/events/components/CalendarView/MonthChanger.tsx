import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons/';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';

import style from './MonthChanger.less';

interface IProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export const MonthChanger = ({ direction, onClick }: IProps) => {
  const icon = direction === 'right' ? faArrowRight : faArrowLeft;
  return (
    <div className={style.monthChanger} onClick={onClick} tabIndex={0}>
      <Icon icon={icon} />
    </div>
  );
};
