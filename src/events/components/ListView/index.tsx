import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IEventViewProps } from '../../models/Event';
import style from './list.less';
import ListEvent from './ListEvent';
import { ListEventsContext, IListEventsState } from 'events/providers/ListEvents';

export type IProps = IEventViewProps & IListEventsState;

class ListView extends Component<IProps> {
  public async componentDidMount() {
    const { init } = this.props;
    await init();
  }

  public render() {
    const { events } = this.props;
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

const Provider = (props: IEventViewProps) => (
  <ListEventsContext.Consumer>{(state) => <ListView {...props} {...state} />}</ListEventsContext.Consumer>
);

export default Provider;
