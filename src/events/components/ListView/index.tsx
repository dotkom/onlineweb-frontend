import React, { Component } from 'react';
import { INewEvent, EventViewProps } from '../../models/Event';
import { DateTime } from 'luxon';
import style from './list.less';
import { getEvents } from '../../api/events';
import ListEvent from './ListEvent';
import HostPolygon from './HostPolygon';
import StatusPolygon from './StatusPolygon';

export interface IState {
  events: INewEvent[];
}

class ListView extends Component<EventViewProps, IState> {
  public state: IState = {
    events: [],
  };

  public async componentDidMount() {
    const events = await getEvents({
      event_end__gte: DateTime.local().toISODate(),
    });

    this.setState({ events });
  }

  public render() {
    const { events } = this.state;
    return (
      <>
      <div className={style.grid}>
        { events.map((event) => <ListEvent key={event.id} {...event} />) }
      </div>
      </>
    );
  }
}

export default ListView;
