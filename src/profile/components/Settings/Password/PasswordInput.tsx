import React from 'react';
import Markdown from 'common/components/Markdown';

interface IProps {
  mdSource: string;
  name: string;
}

const PasswordInput = ({ mdSource, name }: IProps) => {
  return (
    <>
      <Markdown source={mdSource} />
      <input type="password" name={name} id={'id_' + name} />
    </>
  );
};

export default PasswordInput;
