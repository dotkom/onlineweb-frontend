import React, { FC } from 'react';

import { Page } from 'common/components/Panes';
import style from './settings.less';

import Menu from './Menu';

export const SettingsWrapper: FC = ({ children }) => {
  return (
    <div className={style.container}>
      <Menu />
      <Page>{children}</Page>
    </div>
  );
};
