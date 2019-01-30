import classnames from 'classnames';
import React, { Component } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { IUserContext, UserContext } from '../providers/UserProvider';
import style from './link.less';

class PrivateLink extends Component<LinkProps> {
  public static contextType = UserContext;

  public render() {
    const { user }: IUserContext = this.context;
    const { className, to, ...props } = this.props;
    if (user) {
      return <Link {...this.props} />;
    } else {
      const currentClasses = className ? className.split(' ') : [];
      return <Link {...props} className={classnames(currentClasses, style.link)} to="#" />;
    }
  }
}

export default PrivateLink;
