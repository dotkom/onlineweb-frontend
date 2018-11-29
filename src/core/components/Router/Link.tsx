import PrivateLink from 'authentication/components/PrivateLink';
import React from 'react';
import { Link as DefaultLink, LinkProps } from 'react-router-dom';

export interface ILinkProps extends LinkProps {
  requireLogin?: boolean;
}

export const Link = ({ requireLogin, ...props }: ILinkProps) => {
  return requireLogin ? <PrivateLink {...props} /> : <DefaultLink {...props} />;
};
