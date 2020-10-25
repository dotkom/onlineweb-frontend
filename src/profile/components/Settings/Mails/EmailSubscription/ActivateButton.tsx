import { Button } from '@dotkomonline/design-system';
import { useToast } from 'core/utils/toast/useToast';
import { putProfile } from 'profile/api';
import { IUserProfile } from 'profile/models/User';
import React, { FC } from 'react';
import style from './subscription.less';

interface IProps {
  callback: () => void;
  activated: boolean;
  name: 'jobmail' | 'infomail';
}
const ActivateButton: FC<IProps> = ({ activated, callback, name }) => {
  const [addMessage, cancelToast] = useToast({ type: 'success', duration: 5000 });

  const handleClick = async () => {
    const status = activated ? 'av' : 'på';
    const settings: Partial<IUserProfile> = {};
    settings[name] = !activated;

    try {
      await putProfile(settings);
      callback();
      cancelToast();
      addMessage(`Du har blit meldt ${status} ${name}-lista.`);
    } catch (e) {
      cancelToast();
      addMessage(`Vi klart ikke å melde deg ${status}`);
      throw e;
    }
  };
  return (
    <Button className={style.activateBtn} color={activated ? 'danger' : 'success'} onClick={handleClick}>
      {activated ? 'Deaktivér' : 'Aktivér'}
    </Button>
  );
};

export default ActivateButton;
