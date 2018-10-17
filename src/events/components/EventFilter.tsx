import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { EventType } from '../models/Event';

export interface IEventFilter {
  eventTypes: EventType[];
  setEventVisibility: Function;
}

const EventFilter = ({ eventTypes, setEventVisibility }: IEventFilter) => (
  <ButtonGroup className="event-filters">
    { eventTypes.map((eventType: EventType, index: number) => {
      const filterButtonClass = classNames('event-filter-button', {
        'hidden-event-button': !eventType.display,
      });
      return (<Button
        key={index} bsSize="xsmall"
        className={filterButtonClass}
        onClick={() => setEventVisibility({ eventType })}
      >
        { eventType.name }
      </Button>);
    })
    }
  </ButtonGroup>
);

export default EventFilter;
