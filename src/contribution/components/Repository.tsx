import React from 'react';
import style from '../less/contribution.less';
import { IRepository } from '../models/Repository';
import LanguageBar from './LanguageBar';

const Repository = ({ id, name, description, public_url, languages, issues }: IRepository) => {
  return (
    <a className={style.repositoryContainer} href={public_url}>
      <div className={style.repositoryContent}>
        <div className={style.repositoryInfo}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <div className={style.issues}>
          <h2>{issues ? issues : '0'}</h2>
          <h2>Issues</h2>
        </div>
      </div>
      <div className={style.languageBar}>
        <LanguageBar languages={languages} id={id} />
      </div>
    </a>
  );
};

export default Repository;
