import React from 'react';

import classNames from 'classnames';

import style from './heading.less';

export interface IProps {
  title: string;
  className?: string;
}

const Heading = ({ title, className }: IProps) => <h1 className={classNames(style.heading, className)}>{title}</h1>;

export default Heading;
