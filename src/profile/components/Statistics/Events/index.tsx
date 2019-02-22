import { IUserContext, UserContext } from 'authentication/providers/UserProvider';
import CalendarChart from 'common/components/Charts/CalendarChart';
import { FourSplitPane, Page, Pane, SplitPane } from 'common/components/Panes';
import { getAllUserEvents } from 'events/api/events';
import { INewEvent } from 'events/models/Event';
import { DateTime } from 'luxon';
import React, { Component } from 'react';
import NumberStat from '../Orders/NumberStat';
import CompanyDonut, { countCompanies } from './CompanyDonut';
import EventTypeDonut from './EventTypeDonut';
import StringStat from './StringStat';

export interface IProps {}

export interface IState {
  events: INewEvent[];
}

class Orders extends Component<IProps, IState> {
  public static contextType = UserContext;
  public state: IState = {
    events: [],
  };

  public async componentDidMount() {
    const { user }: IUserContext = this.context;
    if (user) {
      const events = await getAllUserEvents({ is_attendee: 'True' }, user);
      this.setState({ events });
    }
  }

  public render() {
    const { events } = this.state;
    const companyPresentations = events.filter(({ event_type }) => event_type === 2);
    const courses = events.filter(({ event_type }) => event_type === 3);
    const social = events.filter(({ event_type }) => event_type === 1);
    const companyEvents = events.filter(({ company_event }) => !!company_event.length);
    const companyCount = countCompanies(events);
    const keys = Object.keys(companyCount);
    const favCompany = keys.reduce((maxKey, key) => (companyCount[key] > companyCount[maxKey] ? key : maxKey), keys[0]);
    const dates = events.map((event) => DateTime.fromISO(event.event_start));
    return (
      <Page loading={events.length === 0}>
        <SplitPane>
          <FourSplitPane>
            <Pane>
              <NumberStat name="Antall arrangementer" value={events.length} />
            </Pane>
            <Pane>
              <NumberStat name="Antall Sosiale" value={social.length} />
            </Pane>
          </FourSplitPane>
          <Pane>{events.length && <EventTypeDonut events={events} />}</Pane>
        </SplitPane>
        <SplitPane>
          <Pane>{events.length && <CompanyDonut events={events} />}</Pane>
          <FourSplitPane>
            <Pane>
              <StringStat name="Favorittbedrift" value={favCompany} />
            </Pane>
            <Pane>
              <NumberStat name="Antall bedriftsarrangementer" value={companyEvents.length} />
            </Pane>
            <Pane>
              <NumberStat name="Antall Bedpres" value={companyPresentations.length} />
            </Pane>
            <Pane>
              <NumberStat name="Antall Kurs" value={courses.length} />
            </Pane>
          </FourSplitPane>
        </SplitPane>
        <Pane>{dates.length && <CalendarChart frequency={dates} header="Arrangementsdatoer" />}</Pane>
      </Page>
    );
  }
}

export default Orders;
