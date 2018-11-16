import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Overlay } from 'react-overlays';
import { getEventColor, INewEvent } from '../../models/Event';
import style from './calendar.less';

interface Props extends INewEvent {

}

interface State {

}

class CalendarEvent extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      overlayVisible: false,
    };

    this.overlayTarget = React.createRef();
  }

  handleMouseEnter = () => {
    this.setState({
      overlayVisible: true,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      overlayVisible: false,
    });
  };

  render() {
    const { event_type, title, id, company_event } = this.props;

    return (
      <>
        <Overlay
          show={this.state.overlayVisible}
          target={this.target}
          placement="top"
        >
          <div>test i guess</div>
        </Overlay>

        <Link to={`/events/${id}`}>
          <p
            style={{ background: getEventColor(event_type) }}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            ref={this.overlayTarget}
            className={style.title}
            title={title}
          >
            {company_event.length === 1 ? company_event[0].company.name : title}
          </p>
        </Link>
      </>
    );
  }
}

export default CalendarEvent;
