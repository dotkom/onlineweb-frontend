import React, { FC } from 'react';

import Markdown from 'common/components/Markdown';
import ResponsiveImage from 'common/components/ResponsiveImage';
import { Link } from 'core/components/Router';
import { IOnlineGroup } from 'groups/models/Groups';

import style from './card.less';

export interface IProps {
  group: IOnlineGroup;
}

export const GroupCard: FC<IProps> = ({ group }) => {
  return (
    <div className={style.hobbyCard}>
      <div className={style.imageContainer}>
        {group.image ? <ResponsiveImage image={group.image} size="xs" type="hobby" /> : null}
      </div>
      <h2 className={style.title}>{group.name_short}</h2>
      <Markdown source={group.description_short} />
      <p className={style.linksContainer}>
        <Link to={`/groups/${group.group.id}`} className={style.link}>{`Les mer om ${group.name_long}`}</Link>
      </p>
    </div>
  );
};
