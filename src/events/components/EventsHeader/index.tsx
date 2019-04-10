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

export interface IPropsChangeViewIconButton {
  changeView: (view: EventView) => void;
  viewType: number;
  view: EventView;
}

export interface IPropsViewIcon {
  viewType: EventView;
}

const ViewIcon = ({ viewType }: IPropsViewIcon) => {
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
    default: {
      return <div />;
    }
  }
};

const ChangeViewIconButton = ({ viewType, changeView, view }: IPropsChangeViewIconButton) => (
  <div
    className={classNames(style.choice, {
      [style.choiceActive]: view === viewType,
    })}
    onClick={() => changeView(viewType)}
    tabIndex={0}
  >
    <ViewIcon viewType={viewType} />
  </div>
);

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
      <span className={style.toggleAccessibleDescription}>Vis kun tilgjengelige arrangementer</span>

      <ToggleSwitch checked={accessible} onChange={toggleAccessible} />
    </span>
  </div>
);

export default EventsHeader;
