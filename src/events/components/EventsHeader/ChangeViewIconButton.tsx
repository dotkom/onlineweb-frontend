import classNames from 'classnames';
import React from 'react';
import { EventView } from '../../models/Event';
import style from './eventsHeader.less';
import ViewIcon from './ViewIcon';

export interface IPropsChangeViewIconButton {
  changeView: (view: EventView) => void;
  viewType: number;
  view: EventView;
}

const ChangeViewIconButton = ({ viewType, changeView, view }: IPropsChangeViewIconButton) => (
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
