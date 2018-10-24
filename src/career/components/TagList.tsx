import React from 'react';
import Tag from './Tag';
import { ITag, ITags, ITagWrapper } from '../models/Tag';
import style from '../less/career.less';

export interface ITagListProps {
  handleChange: (s: string) => void;
  heading: string;
  tags: ITagWrapper;
}

const TagList = ({ tags, handleChange, heading }: ITagListProps) => (
  <div>
    <h3>{heading}</h3>
    <div className={style.tagContainer}>
      {Object.keys(tags).map((id: string) => (
        <Tag
          key={id}
          changeKey={id}
          selected={tags[id].display}
          handleChange={handleChange}
          title={tags[id].name}
        />
      ))}
    </div>
  </div>
);

export default TagList;
