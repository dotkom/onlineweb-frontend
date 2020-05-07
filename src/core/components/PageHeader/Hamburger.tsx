import React, { FC } from 'react';
import cx from 'classnames';

import style from './Hamburger.less';

interface IProps {
  isOpen: boolean;
  onClick: () => void;
}

export const Hamburger: FC<IProps> = ({ isOpen, onClick }) => {
  return (
    <div className={cx(style.hamburger, { [style.open]: isOpen })} onClick={onClick}>
      <div></div>
    </div>
  );
};
