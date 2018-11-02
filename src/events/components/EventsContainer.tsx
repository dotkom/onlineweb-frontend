import React, { Component } from 'react';
import CalendarView from './CalendarView';
import ListView from './ListView';
import ImageView from './ImageView';
import Header from './Header';
import {
  getEventSettings,
  saveEventSettings,
  IEventSettings,
} from '../api/eventSettings';
import { EventView } from '../models/Event';

const getView = (
  view: EventView
): typeof ListView | typeof CalendarView | typeof ImageView => {
  switch (view) {
    case EventView.IMAGE:
      return ImageView;
    case EventView.LIST:
      return ListView;
    case EventView.CALENDAR:
      return CalendarView;
    default:
      return ImageView;
  }
};

export interface IProps {}

export interface IState extends IEventSettings {}

class Container extends Component<IProps, IState> {
  public state: IState = {
    view: EventView.IMAGE,
    accessible: false,
  };

  public async componentDidMount() {
    this.getSettings();
  }

  public getSettings = async () => {
    const settings = await getEventSettings();
    this.setState({ ...settings });
  };

  public saveSettings = async () => {
    saveEventSettings(this.state);
  };

  public changeView = (view: EventView) => {
    this.setState({ view }, () => this.saveSettings());
  };

  public toggleAccessible = () => {
    this.setState({ accessible: !this.state.accessible }, () =>
      this.saveSettings()
    );
  };

  public render() {
    const { view, accessible } = this.state;
    const View = getView(view);
    return (
      <section>
        <Header
          changeView={(v: EventView) => this.changeView(v)}
          toggleAccessible={this.toggleAccessible}
          {...this.state}
        />
        <View accessible={accessible} />
      </section>
    );
  }
}

export default Container;
