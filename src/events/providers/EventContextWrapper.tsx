import React, { ReactChildren } from 'react';
import CalendarEvents from './CalendarEvents';
import ImageEvents from './ImageEvents';
import ListEvents from './ListEvents';
import { IEventViewProps } from 'events/models/Event';

export interface IProps extends IEventViewProps {
  children: JSX.Element[];
}

const Wrapper = ({ children, ...props }: IProps) => {
  return (
    <CalendarEvents {...props}>
      <ImageEvents {...props}>
        <ListEvents {...props}>
          { children }
        </ListEvents>
      </ImageEvents>
    </CalendarEvents>
  );
};

export default Wrapper;
