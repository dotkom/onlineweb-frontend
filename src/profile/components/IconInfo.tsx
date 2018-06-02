import React from 'react';

const STATIC_URL = '/static/img/social/';
const TYPES = {
  Github: 'github-dark',
  Linkedin: 'linkedin-dark',
  Hjemmeside: 'home-dark'
}

class ExternalInfo extends React.Component {
  render() {
    const { type, content } = this.props;
    return (
      <div className="profile-info-icon-wrapper">
        <img className="profile-info-icon" src={`${STATIC_URL + TYPES[type]}.svg`} alt="social-link"/>
        <div className="profile-info-icon-content">
          <p className="profile-info-type">{ type }</p>
          <a className="profile-info-link" href={content}>{ content }</a>
        </div>
      </div>
    );
  }
}

export default ExternalInfo;
