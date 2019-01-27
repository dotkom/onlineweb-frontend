import { DateTime } from 'luxon';
import React from 'react';

import Markdown from 'common/components/Markdown';
import { useCollapse } from 'common/hooks/collapsible';
import { getPenaltyCompletion, ISuspension } from 'profile/models/Penalty';

import style from './penalties.less';
import { PenaltyProgress, PenaltyTitle } from './Penalty';

const penaltyContent = (description: string, expiration: string) => `
  ${description}

  **Utløpsdato:**${expiration}
`;

export interface IProps {
  suspension: ISuspension;
}

export const Suspension = ({ suspension }: IProps) => {
  const expiration = DateTime.fromISO(suspension.expiration_date).toFormat('d MMMM y');
  const added = DateTime.fromISO(suspension.added_date);
  const completion = getPenaltyCompletion(suspension.expiration_date);
  const active = completion < 100;

  const [collapsed, toggleCollapse] = useCollapse(!active);
  return (
    <div className={style.penalty} onClick={toggleCollapse} tabIndex={0}>
      <PenaltyTitle title={suspension.title} added={added} />
      {!collapsed && <Markdown source={penaltyContent(suspension.description, expiration)} />}
      <PenaltyProgress completion={completion} />
    </div>
  );
};

export default Suspension;
