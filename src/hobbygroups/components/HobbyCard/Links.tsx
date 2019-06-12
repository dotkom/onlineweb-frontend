import React, { FC, HTMLProps } from 'react';

import style from './card.less';

export const Links: FC = ({ children }) => <div className={style.linksContainer}>{children}</div>;

export interface IProps extends HTMLProps<HTMLAnchorElement> {
  link: string;
}

export const ReadMore: FC<IProps> = ({ link, ...props }) => {
  return <a href={link} className={style.link} {...props} />;
};
