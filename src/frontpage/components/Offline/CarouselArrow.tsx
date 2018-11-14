import React from 'react';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowAltCircleRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './offline.less';

export interface IProps {
  direction: 'right' | 'left';
  onClick: () => void;
  disabled?: boolean;
}

const CarouselArrow = ({ direction, onClick, disabled = false }: IProps) => (
  <button onClick={onClick} disabled={disabled} className={styles.carouselArrow}>
    <FontAwesomeIcon
      icon={direction === 'left' ? faArrowAltCircleLeft : faArrowAltCircleRight}
      size="2x"
    />
  </button>
);

export default CarouselArrow;
