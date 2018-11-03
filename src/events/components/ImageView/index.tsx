import React, { Component } from 'react';
import { IEventViewProps } from '../../models/Event';
import LargeEvent from './LargeEvent';
import SmallEventColumn from './SmallEvent';
import style from './image.less';
import { ImageEventsContext, IImageEventsState } from 'events/providers/ImageEvents';

export type IProps = IEventViewProps & IImageEventsState;

class ImageView extends Component<IProps> {

  public async componentDidMount() {
    const { init } = this.props;
    await init();
  }

  public render() {
    const { eventsLeft, eventsMiddle, eventsRight, fetched } = this.props;

    if (!fetched) { return null; }

    return (
      <>
        <div className={style.largeEventGrid}>
          <LargeEvent {...eventsLeft[0]} />
          <LargeEvent {...eventsMiddle[0]} />
          <LargeEvent {...eventsRight[0]} />
        </div>
        <div className={style.smallEventGrid}>
          <SmallEventColumn events={ eventsLeft.slice(1, 4) }/>
          <SmallEventColumn events={ eventsMiddle.slice(1, 4) }/>
          <SmallEventColumn events={ eventsRight.slice(1, 4) }/>
        </div>
      </>
    );
  }
}

const Provider = (props: IEventViewProps) => (
  <ImageEventsContext.Consumer>
    { (state) => <ImageView {...props} {...state} /> }
  </ImageEventsContext.Consumer>
);

export default Provider;
