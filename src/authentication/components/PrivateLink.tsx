import Link from 'next/link';
import React, { ComponentProps, FC } from 'react';
import { useSelector } from 'core/redux/hooks';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';

type LinkProps = ComponentProps<typeof Link>;

const PrivateLink: FC<LinkProps> = ({ href, ...props }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn());
  // Render the href only if a user is logged in, else render a disabled link.
  if (isLoggedIn) {
    return <Link {...props} href={href} />;
  } else {
    return <Link {...props} href="#" />;
  }
};

export default PrivateLink;
