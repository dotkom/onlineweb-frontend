import React from 'react';
import classNames from 'classnames';
import { EventView } from '../../models/Event';
import ToggleSwitch from 'common/components/ToggleSwitch';

import ImageViewIcon from './ImageViewIcon';
import ListViewIcon from './ListViewIcon';
import CalendarViewIcon from './CalendarViewIcon';
import style from './eventsHeader.less';

export interface IProps {
  toggleAccessible: () => void;
  changeView: (view: EventView) => void;
  accessible: boolean;
  view: EventView;
}

const EventsHeader = ({ toggleAccessible, changeView, accessible, view }: IProps) => (
  <div className={style.grid}>
    <h1>ARRANGEMENTER</h1>
    <div className={style.choiceGrid}>
      <div
        className={classNames({
          [style.choice]: true,
          [style.choiceActive]: view === EventView.IMAGE,
        })}
        onClick={() => changeView(EventView.IMAGE)}
        tabIndex={0}
      >
        <ImageViewIcon />
      </div>

      <div
        className={classNames({
          [style.choice]: true,
          [style.choiceActive]: view === EventView.LIST,
        })}
        onClick={() => changeView(EventView.LIST)}
        tabIndex={0}
      >
        <ListViewIcon />
      </div>

      <div
        className={classNames({
          [style.choice]: true,
          [style.choiceActive]: view === EventView.CALENDAR,
        })}
        onClick={() => changeView(EventView.CALENDAR)}
        tabIndex={0}
      >
        <CalendarViewIcon />
      </div>
    </div>

    <span className={style.toggleAccessible}>
      <span className={style.toggleAccessibleDescription}>Vis kun tilgjengelige arrangementer</span>

      <ToggleSwitch checked={accessible} onChange={toggleAccessible} />
    </span>
  </div>
);

export default EventsHeader;
