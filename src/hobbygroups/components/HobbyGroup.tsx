import React from 'react';
import { IHobbyGroup } from '../models/HobbyGroup';
import style from '../less/hobbygroups.less';
import ReactMarkdown from 'react-markdown';

const HobbyGroup = ({
  title,
  description,
  image,
  read_more_link,
}: IHobbyGroup) => {
  return (
    <div className={style.hobby}>
      <img src={image} alt={title} />
      <div>
        <h3 className={style.hobbyTitle}>{title}</h3>
        <ReactMarkdown source={description} />
      </div>
    </div>
  );
};

export default HobbyGroup;
