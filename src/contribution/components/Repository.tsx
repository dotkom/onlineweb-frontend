import Markdown from 'common/components/Markdown';
import React from 'react';
import style from '../less/contribution.less';
import { IRepository } from '../models/Repository';
import LanguageBar from './LanguageBar';

const Repository = ({ id, name, description, public_url, languages, issues }: IRepository) => {
  return (
    <a id={style.repositoryContainer} href={public_url}>
      <span className={style.repositoryContent}>
        <div className={style.header}>
          <h3>{name}</h3>
          <hr />
          <Markdown source={description} />
        </div>
        <div className={style.issues}>
          <span>
            <h2>{issues}</h2>
            <h2>Issues</h2>
          </span>
        </div>
      </span>
      <div className={style.languageBar}>
        <span>
          <LanguageBar languages={languages} id={id} />
        </span>
      </div>
    </a>
  );
};

export default Repository;
