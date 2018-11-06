import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IEventViewProps } from '../../models/Event';
import style from './list.less';
import ListEvent from './ListEvent';
import { ListEventsContext, IListEventsState } from 'events/providers/ListEvents';

export type IProps = IEventViewProps;

class ListView extends Component<IProps> {
  public static contextType = ListEventsContext;

  public async componentDidMount() {
    const { init }: IListEventsState = this.context;
    await init();
  }

  public render() {
    const { events }: IListEventsState = this.context;
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
