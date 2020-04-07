import Link from 'next/link';
import React, { Component, ComponentProps } from 'react';
import { IUserContext, UserContext } from '../providers/UserProvider';
// import style from './link.less';

type LinkProps = ComponentProps<typeof Link>;

class PrivateLink extends Component<LinkProps> {
  public static contextType = UserContext;

  public render() {
    const { user }: IUserContext = this.context;
    const { href, ...props } = this.props;
    if (user) {
      return <Link {...this.props} />;
    } else {
      return <Link {...props} href="#" />;
    }
  }
}

export default PrivateLink;
