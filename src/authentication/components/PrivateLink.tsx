import Link from 'next/link';
import React, { Component, ComponentProps } from 'react';
import { IUserContext, UserContext } from '../providers/UserProvider';
// import style from './link.less';

type LinkProps = ComponentProps<typeof Link>;

class PrivateLink extends Component<LinkProps> {
  public static contextType = UserContext;

  public render() {
    const { user }: IUserContext = this.context;
    // ESLint doesn't like object destructuring for key removal although it's neat.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href, ...props } = this.props;
    // Render the href only if a user is logged in, else render a disabled link.
    if (user) {
      return <Link {...this.props} />;
    } else {
      return <Link {...props} href="#" />;
    }
  }
}

export default PrivateLink;
