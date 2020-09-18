import Link from 'next/link';
import React, { ComponentProps } from 'react';
import { getLoginPageUrl } from 'core/appUrls';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';

type LinkProps = ComponentProps<typeof Link>;

const PrivateLink: React.FC<LinkProps> = ({ href, ...props }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  // Render the href only if a user is logged in, else render a disabled link.
  if (isLoggedIn) {
    return <Link {...props} href={href} />;
  } else {
    return <Link {...props} {...getLoginPageUrl()} />;
  }
};

export default PrivateLink;
