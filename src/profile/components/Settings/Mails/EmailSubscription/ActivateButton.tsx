import { Button } from '@dotkomonline/design-system';
import React, { FC } from 'react';
import style from './subscription.less';

interface IProps {
  onClick: () => Promise<void>;
  activated: boolean;
}
const ActivateButton: FC<IProps> = ({ activated, onClick }) => {
  return (
    <Button className={style.activateBtn} color={activated ? 'danger' : 'success'} onClick={onClick}>
      {activated ? 'Deaktivér' : 'Aktivér'}
    </Button>
  );
};

export default ActivateButton;
