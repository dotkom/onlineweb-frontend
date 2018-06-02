import React from 'react';

class Name extends React.Component<{name: string}> {
  render() {
    const { name } = this.props;
    return (
      <div className="profile-container">
        <p className="profile-name">{ name }</p>
      </div>
    );
  }
}

export default Name;
