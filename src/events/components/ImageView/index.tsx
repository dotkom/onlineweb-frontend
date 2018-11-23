import { IImageEventsState, ImageEventsContext } from 'events/providers/ImageEvents';
import React, { Component } from 'react';
import { IEventViewProps } from '../../models/Event';
import style from './image.less';
import LargeEvent from './LargeEvent';
import LargeEventPlaceholder from './LargeEventPlaceholder';
import SmallEventColumn from './SmallEvent';

export type IProps = IEventViewProps;

class ImageView extends Component<IProps> {
  public static contextType = ImageEventsContext;

  public async componentDidMount() {
    const { init }: IImageEventsState = this.context;
    await init();
  }

  public render() {
    const { eventsLeft, eventsMiddle, eventsRight, fetched }: IImageEventsState = this.context;

    if (!fetched) {
      return null;
    }

    return (
      <>
        <div className={style.largeEventGrid}>
          {eventsLeft[0] ? <LargeEvent {...eventsLeft[0]} /> : <LargeEventPlaceholder event_type={2} />}
          {eventsMiddle[0] ? <LargeEvent {...eventsMiddle[0]} /> : <LargeEventPlaceholder event_type={3} />}
          {eventsRight[0] ? <LargeEvent {...eventsRight[0]} /> : <LargeEventPlaceholder event_type={1} />}
        </div>
        <div className={style.smallEventGrid}>
          <SmallEventColumn events={eventsLeft.slice(1, 4)} />
          <SmallEventColumn events={eventsMiddle.slice(1, 4)} />
          <SmallEventColumn events={eventsRight.slice(1, 4)} />
        </div>

        <div className={style.smallerWidthGrid}>
          {eventsLeft[0] ? <LargeEvent {...eventsLeft[0]} /> : <LargeEventPlaceholder event_type={2} />}
          <SmallEventColumn events={eventsLeft.slice(1, 4)} />
          {eventsMiddle[0] ? <LargeEvent {...eventsMiddle[0]} /> : <LargeEventPlaceholder event_type={3} />}
          <SmallEventColumn events={eventsMiddle.slice(1, 4)} />
          {eventsRight[0] ? <LargeEvent {...eventsRight[0]} /> : <LargeEventPlaceholder event_type={1} />}
          <SmallEventColumn events={eventsRight.slice(1, 4)} />
        </div>
      </>
    );
  }
}

export default ImageView;
