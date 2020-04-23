import React, { FC } from 'react';

import ToggleSwitch from 'common/components/ToggleSwitch';

import { EventView } from 'events/models/Event';
import ChangeViewIconButton from './ChangeViewIconButton';

import style from './eventsHeader.less';

interface IProps {
  toggleAccessible: () => void;
  changeView: (view: EventView) => void;
  accessible: boolean;
  view: EventView;
}

const EventsHeader: FC<IProps> = ({ toggleAccessible, changeView, accessible, view }) => {
  return (
    <div className={style.grid}>
      <h1>Arrangementer</h1>
      <div className={style.choiceGrid}>
        <ChangeViewIconButton viewType={EventView.IMAGE} changeView={changeView} view={view} />
        <ChangeViewIconButton viewType={EventView.LIST} changeView={changeView} view={view} />
        <ChangeViewIconButton viewType={EventView.CALENDAR} changeView={changeView} view={view} />
      </div>
      <span className={style.toggleAccessible}>
        <span className={style.toggleAccessibleDescription}>Vis kun arrangementer du kan delta på</span>
        <ToggleSwitch checked={accessible} onChange={toggleAccessible} />
      </span>
    </div>
  );
};

export default EventsHeader;
