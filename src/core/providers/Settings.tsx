import { EventView } from 'events/models/Event';
import React, { Component, createContext } from 'react';

export interface IProps {
  eventView?: EventView;
}

export interface ISettingsContextState {
  eventView: EventView;
}

const INITIAL_STATE: ISettingsContextState = {
  eventView: EventView.IMAGE,
};

export const SettingsContext = createContext(INITIAL_STATE);

class Settings extends Component<IProps, ISettingsContextState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      eventView: props.eventView || INITIAL_STATE.eventView,
    };
  }

  public render() {
    return <SettingsContext.Provider value={this.state}>{this.props.children}</SettingsContext.Provider>;
  }
}

export default Settings;
