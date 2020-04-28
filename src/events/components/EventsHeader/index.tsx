import React, { FC } from 'react';

import { EventView } from 'events/models/Event';
import ChangeViewIconButton from './ChangeViewIconButton';

import style from './eventsHeader.less';

interface IProps {
  changeView: (view: EventView) => void;
  view: EventView;
}

const EventsHeader: FC<IProps> = ({ changeView, view }) => {
  return (
    <div className={style.grid}>
      <h1>Arrangementer</h1>
      <div className={style.choiceGrid}>
        <ChangeViewIconButton viewType={EventView.IMAGE} changeView={changeView} view={view} />
        <ChangeViewIconButton viewType={EventView.LIST} changeView={changeView} view={view} />
        <ChangeViewIconButton viewType={EventView.CALENDAR} changeView={changeView} view={view} />
      </div>
    </div>
  );
};

export default EventsHeader;
