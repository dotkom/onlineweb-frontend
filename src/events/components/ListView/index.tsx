import React, { Component } from 'react';
import { IFrontpageEvent } from '../../models/Event';
import { DateTime } from 'luxon';
import './list.less';

export interface IProps {
  events: IFrontpageEvent[];
}

export interface IState {

}

class ListView extends Component<IProps, IState> {
  public render() {
    const { events } = this.props;
    return (
      <>
      <div className="event-list-grid">
        { events.map((event) => <ListEvent {...event} />) }
      </div>
      <div className="box" />
      </>
    )
  }
}


const ListEvent = ({ title, startDate, event_start }: IFrontpageEvent) => (
  <div className="event-list-element-grid event-list-grid-row">
    { /** First one has to be 1/6 of the line? */ }
    <div className="event-list-element-grid-row"><p>{ 'Bedkom' }</p></div>
    <div className="event-list-element-grid-row"><p>{ title }</p></div>
    <div className="event-list-element-grid-row"><p>{ '23/50' }</p></div>
    <div className="event-list-element-grid-row"><p>{ DateTime.fromISO(startDate).toFormat('d.MM') }</p></div>
    <div className="event-list-element-grid-row"><p>{ 'Y' }</p></div>
  </div>
)

export default ListView;
