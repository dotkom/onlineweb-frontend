import React from 'react';
import classNames from 'classnames';
import { EventView } from '../../models/Event';
import ToggleSwitch from 'common/components/ToggleSwitch';

import ImageViewIcon from './ImageViewIcon';
import ListViewIcon from './ListViewIcon';
import CalendarViewIcon from './CalendarViewIcon';
import './header.less'

export interface IProps {
  toggleAccessible: () => void;
  changeView: (view: EventView) => void;
  accessible: boolean;
  view: EventView;
}

const Header = ({ toggleAccessible, changeView, accessible, view }: IProps) => (
  <div className="event-header-grid">
    <h3>ARRANGEMENTER</h3>

    <div className="event-header-choice-grid">
      <div
        className={classNames({
          'event-header-choice-active': view === EventView.IMAGE,
        })}
        
        onClick={() => changeView(EventView.IMAGE)}
      >
         <ImageViewIcon />
      </div>

      <div
        className={classNames({
          'event-header-choice-active': view === EventView.LIST,
        })}
        
        onClick={() => changeView(EventView.LIST)}
      >
         <ListViewIcon />
      </div>

      <div
        className={classNames({
          'event-header-choice-active': view === EventView.CALENDAR,
        })}
        
        onClick={() => changeView(EventView.CALENDAR)}
      >
         <CalendarViewIcon />
      </div>
    </div>

    <span className='event-header-toggle-accessible'>
      <span className='event-header-toggle-accessible-description'>
        Vis kun tilgjengelige arrangementer
      </span>
      
      <ToggleSwitch checked={accessible} onChange={toggleAccessible}></ToggleSwitch>
    </span>
  </div>
)

export default Header;
