import React from 'react';

import style from '../less/career.less';
import Tag from './Tag';

interface ITag<T> {
  id: T;
  text: string;
}

interface IProps<T> {
  onToggle: (id: T) => void;
  heading: string;
  tags: Array<ITag<T>>;
  selectedIds: T[];
}

function TagList<IdType extends string | number>({ tags, onToggle, heading, selectedIds }: IProps<IdType>) {
  return (
    <div className={style.tagContainer}>
      <h2>{heading}</h2>
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          onToggle={() => onToggle(tag.id)}
          selected={selectedIds.some((id) => id === tag.id)}
          title={tag.text}
        />
      ))}
    </div>
  );
}

export default TagList;
