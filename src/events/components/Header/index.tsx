import React from 'react';
import classNames from 'classnames';
import { EventView } from '../../models/Event';
import ToggleSwitch from 'common/components/ToggleSwitch';

import ImageViewIcon from './ImageViewIcon';
import ListViewIcon from './ListViewIcon';
import CalendarViewIcon from './CalendarViewIcon';
import style from './header.less';

export interface IProps {
  toggleAccessible: () => void;
  changeView: (view: EventView) => void;
  accessible: boolean;
  view: EventView;
}

const Header = ({ toggleAccessible, changeView, accessible, view }: IProps) => (
  <div className={style.grid}>
    <h3>ARRANGEMENTER</h3>

    <div className={style.choiceGrid}>
      <div
        className={classNames({
          [style.choiceActive]: view === EventView.IMAGE,
        })}

        onClick={() => changeView(EventView.IMAGE)}
      >
         <ImageViewIcon />
      </div>

      <div
        className={classNames({
          [style.choiceActive]: view === EventView.LIST,
        })}

        onClick={() => changeView(EventView.LIST)}
      >
         <ListViewIcon />
      </div>

      <div
        className={classNames({
          [style.choiceActive]: view === EventView.CALENDAR,
        })}

        onClick={() => changeView(EventView.CALENDAR)}
      >
         <CalendarViewIcon />
      </div>
    </div>

    <span className={style.toggleAccessible}>
      <span className={style.toggleAccessibleDescription}>
        Vis kun tilgjengelige arrangementer
      </span>

      <ToggleSwitch checked={accessible} onChange={toggleAccessible}></ToggleSwitch>
    </span>
  </div>
);

export default Header;
