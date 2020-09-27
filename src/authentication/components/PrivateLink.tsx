import Link from 'next/link';
import React, { ComponentProps } from 'react';
import { getLoginPageUrl } from 'core/appUrls';
import { useSession } from 'next-auth/client';

type LinkProps = ComponentProps<typeof Link>;

const PrivateLink: React.FC<LinkProps> = ({ href, ...props }) => {
  const [session] = useSession();
  // Render the href only if a user is logged in, else render a disabled link.
  if (session) {
    return <Link {...props} href={href} />;
  } else {
    return <Link {...props} {...getLoginPageUrl()} />;
  }
};

export default PrivateLink;
