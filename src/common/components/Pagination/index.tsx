import React from 'react';

import { PageNumber } from './PageNumber';
import style from './pagination.less';

export interface IProps {
  count: number;
  page: number;
  nextPage?: () => void;
  prevPage?: () => void;
  setPage: (page: number) => void;
}

const generatePageNumbers = (currentPage: number): number[] => {
  const MAX_PAGES = 10;
  const SHIFT_CUTOFF = Math.floor(MAX_PAGES / 2);

  /** Generate array for pages 1 to MAX_PAGES */
  const pages = [...Array(MAX_PAGES)].map((_, i) => i + 1);
  if (currentPage >= SHIFT_CUTOFF) {
    return pages.map((n) => n + (currentPage - (SHIFT_CUTOFF - 1)));
  }
  return pages;
};

export const Pagination = ({ page, setPage }: IProps) => {
  const pageNumbers = generatePageNumbers(page);
  return (
    <div className={style.pagination}>
      {pageNumbers.map((num) => (
        <PageNumber page={num} key={`pagination-key-${num}`} selected={page === num} onClick={setPage} />
      ))}
    </div>
  );
};
