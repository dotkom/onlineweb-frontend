import { ImageEventsContext } from 'events/providers/ImageEvents';
import React, { Component, ContextType } from 'react';
import { IEventViewProps } from '../../models/Event';
import style from './image.less';
import LargeEvent from './LargeEvent';
import LargeEventPlaceholder from './LargeEventPlaceholder';
import SmallEventColumn from './SmallEvent';

export type IProps = IEventViewProps;

class ImageView extends Component<IProps> {
  public static contextType = ImageEventsContext;
  public context!: ContextType<typeof ImageEventsContext>;

  public async componentDidMount() {
    const { init } = this.context;
    await init();
  }

  public render() {
    const { eventsLeft, eventsMiddle, eventsRight, fetched } = this.context;

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
      </>
    );
  }
}

export default ImageView;
