import classNames from 'classnames';
import ToggleSwitch from 'common/components/ToggleSwitch';
import React from 'react';
import { EventView } from '../../models/Event';

import CalendarViewIcon from './CalendarViewIcon';
import style from './eventsHeader.less';
import ImageViewIcon from './ImageViewIcon';
import ListViewIcon from './ListViewIcon';

export interface IProps {
  toggleAccessible: () => void;
  changeView: (view: EventView) => void;
  accessible: boolean;
  view: EventView;
  availableViews: number[];
}

const viewIcon = (viewType: EventView) => {
  switch (viewType) {
    case EventView.CALENDAR: {
      return <CalendarViewIcon />;
    }
    case EventView.LIST: {
      return <ListViewIcon />;
    }
    case EventView.IMAGE: {
      return <ImageViewIcon />;
    }
  }
};

const changeViewIconButton = (viewType: number, changeView: (view: EventView) => void, view: EventView) => (
  <div
    className={classNames(style.choice, {
      [style.choiceActive]: view === viewType,
    })}
    onClick={() => changeView(viewType)}
    tabIndex={0}
  >
    {viewIcon(viewType)}
  </div>
);

const EventsHeader = ({ toggleAccessible, changeView, accessible, view, availableViews }: IProps) => (
  <div className={style.grid}>
    <h1>Arrangementer</h1>
    <div className={style.choiceGrid}>
      {availableViews.includes(EventView.IMAGE) && changeViewIconButton(EventView.IMAGE, changeView, view)}
      {availableViews.includes(EventView.LIST) && changeViewIconButton(EventView.LIST, changeView, view)}
      {availableViews.includes(EventView.CALENDAR) && changeViewIconButton(EventView.CALENDAR, changeView, view)}
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
