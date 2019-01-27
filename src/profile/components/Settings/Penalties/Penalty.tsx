import { DateTime } from 'luxon';
import React from 'react';

import { Pane } from 'common/components/Panes';
import { getCompletionColor, Penalty, sortByExpiration } from 'profile/models/Penalty';

import style from './penalties.less';
import Placeholder from './Placeholder';

export interface IPenaltyTitleProps {
  title: string;
  added: DateTime;
}

export const PenaltyTitle = ({ title, added }: IPenaltyTitleProps) => {
  return (
    <div className={style.penaltyTitle}>
      <h3>{title}</h3>
      <span>{added.toFormat('d MMMM y')}</span>
    </div>
  );
};

export interface IPenaltyProgressProps {
  completion: number;
}

export const PenaltyProgress = ({ completion }: IPenaltyProgressProps) => {
  const completionColor = getCompletionColor(completion);
  return <div className={style.progressBar} style={{ width: completion + '%', backgroundColor: completionColor }} />;
};

export interface IPenaltyPaneProps {
  render: (penalty: Penalty) => JSX.Element;
  penalties: Penalty[];
  loaded: boolean;
  ifNone: string;
  name: string;
}

export const PenaltyPane = ({ loaded, render, penalties, ifNone, name }: IPenaltyPaneProps) => {
  return (
    <Pane>
      <h2>{name}</h2>
      {!loaded ? <Placeholder /> : penalties.length ? penalties.sort(sortByExpiration).map(render) : <p>{ifNone}</p>}
    </Pane>
  );
};
