import React from 'react';
import { IRepository } from '../models/Repository';
import ReactMarkdown from 'react-markdown';
import style from '../less/contribution.less';
import LanguageBar from './LanguageBar';

const Repository = ({ id, name, description, public_url, languages, issues }: IRepository) => {
  return (
    <a className={style.repositoryContainer} href={public_url}>
      <span className={style.repositoryContent}>
        <div className={style.header}>
          <h3>{name}</h3>
          <hr />
          <ReactMarkdown source={description} />
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
