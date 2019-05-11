import classNames from 'classnames';
import React from 'react';

import { EventView } from 'events/models/Event';
import ViewIcon from './ViewIcon';

import style from './eventsHeader.less';

export interface IProps {
  changeView: (view: EventView) => void;
  viewType: number;
  view: EventView;
}

const ChangeViewIconButton = ({ viewType, changeView, view }: IProps) => (
  <div
    className={classNames(style.choice, {
      [style.choiceActive]: view === viewType,
    })}
    onClick={() => changeView(viewType)}
    tabIndex={0}
  >
    <ViewIcon viewType={viewType} />
  </div>
);

export default ChangeViewIconButton;
