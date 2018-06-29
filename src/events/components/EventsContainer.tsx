import React, { Component } from 'react';
import CalendarView from './CalendarView';
import ListView from './ListView';
import ImageView from './ImageView';
import Header from './Header';
import { EventView, EventViewProps } from '../models/Event';

const getView = (view: EventView): typeof ListView | typeof CalendarView | typeof ImageView => {
  switch (view) {
    case EventView.IMAGE: return ImageView;
    case EventView.LIST: return ListView;
    case EventView.CALENDAR: return CalendarView;
    default: return ImageView;
  }
}

export interface IProps {

}

export interface IState {
  view: EventView;
  accessible: boolean
}

class Container extends Component<IProps, IState> {
  state: IState = {
    view: EventView.IMAGE,
    accessible: false
  }

  public changeView = (view: EventView) => {
    this.setState({ view });
  }

  public toggleAccessible = () => {
    this.setState({ accessible: !this.state.accessible })
  }

  public render() {
    const { view, accessible } = this.state;
    const View = getView(view);
    return (
      <div style={{ marginTop: '14rem' }}>
        <Header
          changeView={(view: EventView) => this.changeView(view)}
          toggleAccessible={this.toggleAccessible}
          {...this.state} />
        <View accessible={accessible} />
      </div>
    )
  }
}

export default Container;
