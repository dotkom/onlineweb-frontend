import React, { FC } from 'react';
import { md } from 'common/components/Markdown';

interface IProps {
  description: string;
}

export const Description: FC<IProps> = ({ description }) => {
  const markdown = md`${description}`;
  return <>{markdown}</>;
};
