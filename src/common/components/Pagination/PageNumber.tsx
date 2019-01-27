import classnames from 'classnames';
import React from 'react';

import style from './pagination.less';

export interface IProps {
  page: number;
  selected: boolean;
  onClick: (page: number) => void;
}

export const PageNumber = ({ page, selected, onClick }: IProps) => {
  return (
    <div
      className={classnames(style.pageNumber, {
        [style.selected]: selected,
      })}
      onClick={() => onClick(page)}
    >
      <p>{page}</p>
    </div>
  );
};
