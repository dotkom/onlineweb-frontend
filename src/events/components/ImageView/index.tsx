import React, { Component } from 'react';
import { IEventViewProps } from '../../models/Event';
import LargeEvent from './LargeEvent';
import SmallEventColumn from './SmallEvent';
import style from './image.less';
import { ImageEventsContext, IImageEventsState } from 'events/providers/ImageEvents';

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
          <LargeEvent {...eventsLeft[0]} />
          <LargeEvent {...eventsMiddle[0]} />
          <LargeEvent {...eventsRight[0]} />
        </div>
        <div className={style.smallEventGrid}>
          <SmallEventColumn events={eventsLeft.slice(1, 4)} />
          <SmallEventColumn events={eventsMiddle.slice(1, 4)} />
          <SmallEventColumn events={eventsRight.slice(1, 4)} />
        </div>
      </>
    );
  }
}

export default ImageView;
