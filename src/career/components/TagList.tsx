import { ISelectable, TagTypes } from 'career/models/Career';
import React from 'react';
import style from '../less/career.less';
import Tag from './Tag';

export interface IProps {
  handleChange: (_: string) => void;
  heading: string;
  tags: Array<ISelectable<TagTypes>>;
}

const TagList = ({ tags, handleChange, heading }: IProps) => (
  <div className={style.tagContainer}>
    <h2>{heading}</h2>
    {tags.map((tag) => (
      <Tag
        key={tag.value.name}
        toggle={() => handleChange(tag.value.name)}
        selected={tag.selected}
        title={tag.value.name}
      />
    ))}
  </div>
);

export default TagList;
