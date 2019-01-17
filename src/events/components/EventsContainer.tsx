import { ISettingsContextState, SettingsContext } from 'core/providers/Settings';
import React, { Component } from 'react';
import { getEventSettings, IEventSettings, saveEventSettings } from '../api/eventSettings';
import { EventView } from '../models/Event';
import CalendarView from './CalendarView';
import EventsHeader from './EventsHeader';
import ImageView from './ImageView';
import style from './less/eventsContainer.less';
import ListView from './ListView';

const getView = (view: EventView): typeof ListView | typeof CalendarView | typeof ImageView => {
  switch (view) {
    case EventView.IMAGE:
      return ImageView;
    case EventView.LIST:
      return ListView;
    case EventView.CALENDAR:
      return CalendarView;
    default:
      return ImageView;
  }
};

export const getEventView = (viewString: string | undefined) => {
  if (!viewString) {
    return EventView.IMAGE;
  }
  const view = Number(viewString);
  if ([EventView.IMAGE, EventView.LIST, EventView.CALENDAR].indexOf(view) >= 0) {
    return view;
  } else {
    return EventView.IMAGE;
  }
};

export interface IProps {}

export interface IState extends IEventSettings {}

class Container extends Component<IProps & ISettingsContextState, IState> {
  public static contextType = SettingsContext;

  constructor(props: IProps & ISettingsContextState) {
    super(props);
    this.state = {
      view: props.eventView,
      accessible: false,
    };
  }

  public async componentDidMount() {
    this.getSettings();
  }

  public getSettings = async () => {
    const settings = await getEventSettings();
    const { eventView }: ISettingsContextState = this.context;
    this.setState({ ...settings, view: eventView });
  };

  public saveSettings = async () => {
    saveEventSettings(this.state);
  };

  public changeView = (view: EventView) => {
    this.setState({ view }, () => this.saveSettings());
  };

  public toggleAccessible = () => {
    this.setState({ accessible: !this.state.accessible }, () => this.saveSettings());
  };

  public render() {
    const { view, accessible } = this.state;
    const View = getView(view);
    return (
      <section className={style.section}>
        <EventsHeader
          changeView={(v: EventView) => this.changeView(v)}
          toggleAccessible={this.toggleAccessible}
          {...this.state}
        />
        <View accessible={accessible} />
      </section>
    );
  }
}

const Wrapper = (props: IProps) => (
  <SettingsContext.Consumer>{(state) => <Container {...props} {...state} />}</SettingsContext.Consumer>
);

export default Wrapper;
