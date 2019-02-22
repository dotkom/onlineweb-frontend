import { faChevronCircleLeft as ChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronCircleLeft';
import { faChevronCircleRight as ChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronCircleRight';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from './offline.less';

export interface IProps {
  direction: 'right' | 'left';
  onClick: () => void;
  disabled?: boolean;
}

const CarouselArrow = ({ direction, onClick, disabled = false }: IProps) => (
  <button onClick={onClick} disabled={disabled} className={styles.carouselArrow}>
    <Icon icon={direction === 'left' ? ChevronLeft : ChevronRight} fixedWidth />
  </button>
);

export default CarouselArrow;
