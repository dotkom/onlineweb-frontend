import React, { FC } from 'react';

import style from './UserButton.less';
import { useSelector } from 'core/redux/hooks';
import { selectUserImage, selectFullName } from 'authentication/selectors/authentication';

interface IProps {
  onClick: () => void;
}

export const UserButton: FC<IProps> = ({ onClick }) => {
  const image = useSelector(selectUserImage());
  const fullName = useSelector(selectFullName());
  return (
    <button className={style.button} onClick={onClick}>
      <img className={style.image} src={image} alt={fullName}></img>
    </button>
  );
};
