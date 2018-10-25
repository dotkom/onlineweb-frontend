import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { INewEvent, IEventViewProps } from '../../models/Event';
import { DateTime } from 'luxon';
import style from './list.less';
import { getEvents } from '../../api/events';
import ListEvent from './ListEvent';

export interface IState {
  events: INewEvent[];
}

class ListView extends Component<IEventViewProps, IState> {
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
        {events.map((event) => (
          <Link to={`/events/${event.id}`} key={event.id}>
            <ListEvent {...event} />
          </Link>
        ))}
      </div>
      </>
    );
  }
}

export default ListView;
