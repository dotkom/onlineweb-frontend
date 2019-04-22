import React from 'react';

import ToggleSwitch from 'common/components/ToggleSwitch';

import { EventView } from 'events/models/Event';
import ChangeViewIconButton from './ChangeViewIconButton';

import style from './eventsHeader.less';

export interface IProps {
  toggleAccessible: () => void;
  changeView: (view: EventView) => void;
  accessible: boolean;
  view: EventView;
  availableViews: EventView[];
}

const EventsHeader = ({ toggleAccessible, changeView, accessible, view, availableViews }: IProps) => (
  <div className={style.grid}>
    <h1>Arrangementer</h1>
    <div className={style.choiceGrid}>
      {availableViews.includes(EventView.IMAGE) && (
        <ChangeViewIconButton viewType={EventView.IMAGE} changeView={changeView} view={view} />
      )}
      {availableViews.includes(EventView.LIST) && (
        <ChangeViewIconButton viewType={EventView.LIST} changeView={changeView} view={view} />
      )}
      {availableViews.includes(EventView.CALENDAR) && (
        <ChangeViewIconButton viewType={EventView.CALENDAR} changeView={changeView} view={view} />
      )}
    </div>

    <span className={style.toggleAccessible}>
      <span className={style.toggleAccessibleDescription}>
        {!accessible ? 'Kan delta?' : 'Viser arrangementer du kan delta på'}
      </span>

      <ToggleSwitch checked={accessible} onChange={toggleAccessible} />
    </span>
  </div>
);

export default EventsHeader;
