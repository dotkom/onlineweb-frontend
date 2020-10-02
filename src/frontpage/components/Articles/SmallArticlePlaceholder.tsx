import { CompactLogo } from '@dotkomonline/design-system';
import classnames from 'classnames';
import React from 'react';
import style from './articles.less';

const SmallArticlePlaceholder = () => {
  return (
    <div className={classnames(style.articleContainer, style.smallArticle)}>
      <CompactLogo />
      <div>
        <h2>Tom artikkel</h2>
        <p>Vi er tom for artikler.</p>
      </div>
    </div>
  );
};

export default SmallArticlePlaceholder;
