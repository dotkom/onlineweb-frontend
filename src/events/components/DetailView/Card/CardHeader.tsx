import React from 'react';
import style from './card.less';

export interface IProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text?: string;
  color?: string;
}

const CardHeader = ({ text, children, color = '#454545', ...props }: IProps) => (
  <p {...props} className={style.cardHeader} style={{ color }}>
    {children || text}
  </p>
);

export default CardHeader;
