import React from 'react';
import Medal from './Medal';
import { IMedal } from '../models/Medal';

export interface Props {
  medals: IMedal[];
}

class Name extends React.Component<Props> {
  render() {
    const { medals } = this.props;
    return (
      <div className="profile-container side-scroll">
        { medals.map(medal => 
          <Medal
            key={medal.committee + medal.position + medal.range}
            committee={ medal.committee }
            position={ medal.position }
            range={ medal.range }
          />
        )}
      </div>
    );
  }
}

export default Name;
