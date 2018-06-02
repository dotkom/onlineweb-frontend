import React from 'react';

export interface Props {
  type: string;
  content: string;
}

class Info extends React.Component<Props> {
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
