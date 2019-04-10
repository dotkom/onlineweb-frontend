import React from 'react';
import { EventView } from '../../models/Event';
import CalendarViewIcon from './CalendarViewIcon';
import ImageViewIcon from './ImageViewIcon';
import ListViewIcon from './ListViewIcon';

export interface IProps {
  viewType: EventView;
}

const ViewIcon = ({ viewType }: IProps) => {
  switch (viewType) {
    case EventView.CALENDAR: {
      return <CalendarViewIcon />;
    }
    case EventView.LIST: {
      return <ListViewIcon />;
    }
    case EventView.IMAGE: {
      return <ImageViewIcon />;
    }
  }
};

export default ViewIcon;
