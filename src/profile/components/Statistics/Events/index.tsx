import CalendarChart from 'common/components/Charts/CalendarChart';
import { FourSplitPane, Page, Pane, SplitPane } from 'common/components/Panes';
import { getAllEvents } from 'events/api/events';
import { IEvent } from 'events/models/Event';
import { DateTime } from 'luxon';
import React, { Component } from 'react';
import NumberStat from '../Orders/NumberStat';
import CompanyDonut, { countCompanies } from './CompanyDonut';
import EventTypeDonut from './EventTypeDonut';
import StringStat from './StringStat';
import style from './events.less';

export interface IState {
  events: IEvent[];
}

class Orders extends Component<{}, IState> {
  public state: IState = {
    events: [],
  };

  public async componentDidMount() {
    const events = await getAllEvents({ is_attendee: 'True' });
    this.setState({ events });
  }

  public render() {
    const { events } = this.state;
    const companyPresentations = events.filter(({ event_type }) => event_type === 2);
    const courses = events.filter(({ event_type }) => event_type === 3);
    const social = events.filter(({ event_type }) => event_type === 1);
    const eventWithCompanyCount = events.filter((event) => event.companies.length > 0).length;
    const companyCount = countCompanies(events);
    const keys = Object.keys(companyCount);
    const favCompany = keys.reduce((maxKey, key) => (companyCount[key] > companyCount[maxKey] ? key : maxKey), keys[0]);
    const dates = events.map((event) => DateTime.fromISO(event.start_date));
    const noCompanyString = <p>Du har ikke vært på et bedriftsarrangement ennå</p>;
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
          <Pane className={eventWithCompanyCount ? '' : style.noCompanyString}>
            {eventWithCompanyCount ? <CompanyDonut events={events} /> : noCompanyString}
          </Pane>
          <FourSplitPane>
            <Pane>
              <StringStat name="Favorittbedrift" value={favCompany || 'Ingen'} />
            </Pane>
            <Pane>
              <NumberStat name="Antall bedriftsarrangementer" value={eventWithCompanyCount} />
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
