import React from 'react';

class Info extends React.Component {
  render() {
    const { type, content } = this.props;
    return (
      <div className="profile-info-wrapper">
        <p className="profile-info-type">{ type }</p>
        <p className="profile-info-content">{ content }</p>
      </div>
    );
  }
}

export default Info;
