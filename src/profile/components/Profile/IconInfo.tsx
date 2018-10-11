import React from 'react';
import { STATIC_URL } from 'common/constants/endpoints';
import { Type, TypeIndex } from '../../models/ImageTypes';
import github from 'common/img/profile/github.svg';
import home from 'common/img/profile/home.svg';
import linkedin from 'common/img/profile/linkedin.svg';
import style from '../../less/profile.less';

const SOCIAL_STATIC = STATIC_URL + 'common/img/social/';

const TYPES: Type = {
  Github: github,
  Linkedin: linkedin,
  Hjemmeside: home
}

export interface Props {
  type: TypeIndex;
  content: string;
}

class ExternalInfo extends React.Component<Props> {
  render() {
    const { type, content } = this.props;
    return (
      <div className={style.infoIconWrapper}>
        <img className={style.infoIcon} src={TYPES[type]} alt="social-link"/>
        <div className={style.infoIconContent}>
          <p className={''}>{ type }</p>
          <a className={''} href={content}>{ content }</a>
        </div>
      </div>
    );
  }
}

export default ExternalInfo;
