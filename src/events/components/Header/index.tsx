import React from 'react';
import { EventView } from '../../models/Event';
import ToggleSwitch from 'common/components/ToggleSwitch';
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
      <div className={view === EventView.IMAGE ? 'event-header-choice-active' : ''} onClick={() => changeView(EventView.IMAGE)}></div>
      <div className={view === EventView.LIST ? 'event-header-choice-active' : ''} onClick={() => changeView(EventView.LIST)}></div>
      <div className={view === EventView.CALENDAR ? 'event-header-choice-active' : ''} onClick={() => changeView(EventView.CALENDAR)}></div>
    </div>
    <span><ToggleSwitch checked={accessible} onChange={toggleAccessible}>"Toggle Switch"</ToggleSwitch></span>  
  </div>
)

export default Header;
