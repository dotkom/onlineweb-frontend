import { STATIC_URL } from 'common/constants/endpoints';
import github from 'common/img/profile/github.svg';
import home from 'common/img/profile/home.svg';
import linkedin from 'common/img/profile/linkedin.svg';
import React from 'react';
import style from '../../less/profile.less';
import { IType, TypeIndex } from '../../models/ImageTypes';

const SOCIAL_STATIC = STATIC_URL + 'common/img/social/';

const TYPES: IType = {
  Github: github,
  Linkedin: linkedin,
  Hjemmeside: home,
};

export interface IProps {
  type: TypeIndex;
  content: string;
}

class ExternalInfo extends React.Component<IProps> {
  public render() {
    const { type, content } = this.props;
    return (
      <div className={style.infoIconWrapper}>
        <img className={style.infoIcon} src={TYPES[type]} alt="social-link" />
        <div className={style.infoIconContent}>
          <p className={''}>{type}</p>
          <a className={''} href={content}>
            {content}
          </a>
        </div>
      </div>
    );
  }
}

export default ExternalInfo;
