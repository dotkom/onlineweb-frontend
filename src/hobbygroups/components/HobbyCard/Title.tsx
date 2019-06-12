import React, { FC } from 'react';

import style from './card.less';

export const Title: FC = ({ children }) => <h2 className={style.title}>{children}</h2>;
