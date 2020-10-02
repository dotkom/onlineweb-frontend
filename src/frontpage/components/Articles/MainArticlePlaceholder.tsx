import { CompactLogo } from '@dotkomonline/design-system';
import classnames from 'classnames';
import React from 'react';
import style from './articles.less';

const MainArticlePlaceholder = () => {
  return (
    <div className={classnames(style.articleContainer)}>
      <CompactLogo />
      <div>
        <h2>Tom artikkel</h2>
        <p>Vi er tom for artikler.</p>
      </div>
    </div>
  );
};

export default MainArticlePlaceholder;
