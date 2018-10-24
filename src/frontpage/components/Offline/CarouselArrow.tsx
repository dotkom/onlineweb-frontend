import React from 'react';

export interface IProps {
  direction: 'right' | 'left';
  onClick: () => void;
  disabled?: boolean;
}

const CarouselArrow = ({ direction, onClick, disabled = false }: IProps) => (
  <button onClick={onClick} disabled={disabled}>
    { direction === 'left' ? '<' : null }
    { direction === 'right' ? '>' : null }
  </button>
);

export default CarouselArrow;
