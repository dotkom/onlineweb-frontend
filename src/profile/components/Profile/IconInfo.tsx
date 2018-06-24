import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';
import { Type, TypeIndex } from '../../models/ImageTypes';

const SOCIAL_STATIC = STATIC_URL + 'img/social/';

const TYPES: Type = {
  Github: 'github-dark',
  Linkedin: 'linkedin-dark',
  Hjemmeside: 'home-dark'
}

export interface Props {
  type: TypeIndex;
  content: string;
}

class ExternalInfo extends React.Component<Props> {
  render() {
    const { type, content } = this.props;
    return (
      <div className="profile-info-icon-wrapper">
        <img className="profile-info-icon" src={`${SOCIAL_STATIC + TYPES[type]}.svg`} alt="social-link"/>
        <div className="profile-info-icon-content">
          <p className="profile-info-type">{ type }</p>
          <a className="profile-info-link" href={content}>{ content }</a>
        </div>
      </div>
    );
  }
}

export default ExternalInfo;
