import React from 'react';
import style from './header.less';

export interface IProps {
  isOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MenuButton = (props: IProps) => (
  <button className={`${style.menuButton} ${props.isOpen ? style.open : ''}`} onClick={props.onClick}>
    <svg
      x="0px"
      y="0px"
      width="100%"
      viewBox="0 0 96 96"
      className={style.menuButtonSVG}
      enableBackground="new 0 0 96 96"
    >
      <rect width="32" height="4" x="32" y="46" className={style.menuButtonSVGTop} />
    </svg>
    <svg
      x="0px"
      y="0px"
      width="100%"
      viewBox="0 0 96 96"
      className={style.menuButtonSVG}
      enableBackground="new 0 0 96 96"
    >
      <rect width="32" height="4" x="32" y="46" className={style.menuButtonSVGBottom} />
    </svg>
  </button>
);

export default MenuButton;
