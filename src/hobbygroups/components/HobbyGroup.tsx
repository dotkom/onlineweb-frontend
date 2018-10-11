import React from 'react';
import { IHobbyGroup } from '../models/HobbyGroup';
import style from '../less/hobbygroups.less';
import ReactMarkdown from 'react-markdown';

const HobbyGroup = ({ title, description, image, read_more_link }: IHobbyGroup) => {
  return (
    <div className={style.hobby}>
      <img src={image} alt={title} />
      <span>
        <h3>{title}</h3>
        <ReactMarkdown source={description} />
      </span>
    </div>
  );
};

export default HobbyGroup;