import { Link } from 'core/components/Router';
import { ListEventsContext } from 'events/providers/ListEvents';
import React, { Component, ContextType } from 'react';
import { IEventViewProps } from '../../models/Event';
import style from './list.less';
import ListEvent from './ListEvent';

export type IProps = IEventViewProps;

class ListView extends Component<IProps> {
  public static contextType = ListEventsContext;
  public context!: ContextType<typeof ListEventsContext>;

  public async componentDidMount() {
    const { init } = this.context;
    await init();
  }

  public render() {
    const { events } = this.context;
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
