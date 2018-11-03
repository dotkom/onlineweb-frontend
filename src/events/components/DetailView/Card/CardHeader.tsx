import React from 'react';

export interface IProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text?: string;
  color?: string;
}

const CardHeader = ({ text, children, color = '#454545', ...props }: IProps) => (
  <h2 {...props} style={{ color }}>
    {children || text}
  </h2>
);

export default CardHeader;
