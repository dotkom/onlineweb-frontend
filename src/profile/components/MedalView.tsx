import React from 'react';

import Medal from './Medal'

class Name extends React.Component {
  render() {
    const { medals } = this.props;
    return (
      <div className="profile-container side-scroll">
        { medals.map(medal => 
          <Medal
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
