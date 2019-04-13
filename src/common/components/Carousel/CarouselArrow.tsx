import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import styles from './carousel.less';

export interface IProps {
  direction: 'right' | 'left';
  onClick: () => void;
  disabled?: boolean;
}

const CarouselArrow = ({ direction, onClick, disabled = false }: IProps) => (
  <button onClick={onClick} disabled={disabled} className={styles.carouselArrow}>
    <FontAwesomeIcon icon={direction === 'left' ? faArrowLeft : faArrowRight} size="2x" />
  </button>
);

export default CarouselArrow;
