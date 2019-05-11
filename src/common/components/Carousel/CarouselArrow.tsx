import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

import styles from './carousel.less';

export interface IProps {
  direction: 'right' | 'left';
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const CarouselArrow = ({ direction, onClick, disabled = false, className }: IProps) => (
  <button onClick={onClick} disabled={disabled} className={classNames(styles.carouselArrow, className)}>
    <FontAwesomeIcon icon={direction === 'left' ? faArrowLeft : faArrowRight} size="2x" />
  </button>
);

export default CarouselArrow;
