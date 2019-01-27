import { DateTime } from 'luxon';
import React from 'react';

import Markdown from 'common/components/Markdown';
import { useCollapse } from 'common/hooks/collapsible';
import { getMarkCategory, getPenaltyCompletion, IMark } from 'profile/models/Penalty';

import style from './penalties.less';
import { PenaltyProgress, PenaltyTitle } from './Penalty';

const penaltyContent = (description: string, expiration: string, category: string) => `
  ${description}

  **Kategori:** ${category}

  **Utløpsdato:**${expiration}
`;

export interface IProps {
  markUser: IMark;
}

export const Mark = ({ markUser: { mark, expiration_date } }: IProps) => {
  const expiration = DateTime.fromISO(expiration_date).toFormat('d MMMM y');
  const added = DateTime.fromISO(mark.added_date);
  const completion = getPenaltyCompletion(expiration_date);
  const category = getMarkCategory(mark.category);
  const active = completion < 100;

  const [collapsed, toggleCollapse] = useCollapse(!active);
  return (
    <div className={style.penalty} onClick={toggleCollapse} tabIndex={0}>
      <PenaltyTitle title={mark.title} added={added} />
      {!collapsed && <Markdown source={penaltyContent(mark.description, expiration, category)} />}
      <PenaltyProgress completion={completion} />
    </div>
  );
};

export default Mark;
