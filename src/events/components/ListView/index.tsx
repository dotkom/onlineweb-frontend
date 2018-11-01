import React, { Component } from 'react';
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
        { events.map((event) => <ListEvent key={event.id} {...event} />) }
      </div>
      </>
    );
  }
}

const Provider = (props: IEventViewProps) => (
  <ListEventsContext.Consumer>
    { (state) => <ListView {...props} {...state} /> }
  </ListEventsContext.Consumer>
);

export default Provider;
