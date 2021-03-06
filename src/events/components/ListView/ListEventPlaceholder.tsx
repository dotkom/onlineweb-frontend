import { faCalendarAlt, faUser } from '@fortawesome/free-regular-svg-icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React from 'react';
import { EventTypeEnum, getEventColor, getEventType } from '../../models/Event';
import style from './list.less';

interface IProps {
  eventType: EventTypeEnum;
}

const ListEventPlaceholder = (props: IProps) => {
  const eventColor = getEventColor(props.eventType);
  const eventType = getEventType(props.eventType);

  return (
    <div className={classnames(style.gridRow)}>
      <div className={style.eventTypeDiv}>
        <span style={{ background: eventColor }} />
        <p className={style.eventType} style={{ color: eventColor }}>
          {eventType}
        </p>
      </div>
      <p className={style.eventTitle}>Dette er et tomt arrangement.</p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faCalendarAlt} fixedWidth />
      </div>
      <p>00.00</p>
      <div className={style.icon}>
        <FontAwesomeIcon icon={faUser} fixedWidth />
      </div>
      <p> 0/0 </p>
    </div>
  );
};

export default ListEventPlaceholder;
