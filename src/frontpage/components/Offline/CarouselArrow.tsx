import React from 'react';
import styles from './offline.less';

export interface IProps {
  direction: 'right' | 'left';
  onClick: () => void;
  disabled?: boolean;
}

const CarouselArrow = ({ direction, onClick, disabled = false }: IProps) => (
  <button onClick={onClick} disabled={disabled} className={styles.carouselArrow}>
    {direction === 'left' ? '<' : null}
    {direction === 'right' ? '>' : null}
  </button>
);

export default CarouselArrow;
