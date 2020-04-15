import PrivateLink from 'authentication/components/PrivateLink';
import DefaultLink from 'next/link';
import React, { ComponentProps, FC, ReactNode } from 'react';

type LinkProps = ComponentProps<typeof DefaultLink>;

export interface ILinkProps extends LinkProps {
  requireLogin?: boolean;
  children?: ReactNode;
}

export const Link: FC<ILinkProps> = ({ requireLogin, ...props }: ILinkProps) => {
  return requireLogin ? <PrivateLink {...props} /> : <DefaultLink {...props} />;
};
