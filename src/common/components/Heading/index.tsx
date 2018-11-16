import React from 'react';
import style from './heading.less';

export interface IProps {
  title: string;
}

const Heading = ({ title }: IProps) => <h1 className={style.heading}>{title}</h1>;

export default Heading;
