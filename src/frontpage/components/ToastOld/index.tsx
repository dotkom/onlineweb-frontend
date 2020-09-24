// @ts-nocheck;
import React, { useEffect, useState } from 'react';
import { useToast } from 'core/utils/toast/useToast';
import { Checkbox } from '@dotkomonline/design-system';


const HIDE_TOAST = 'hideOldOWToast';

const Message: React.FC = () => {
  const saveDoNotShow = (isChecked?: boolean) => {
    window.localStorage.setItem(HIDE_TOAST, isChecked ? 'true' : 'false');
  };

  return (
    <div>
      <h2>Heisann!</h2>
      <p>Velkommen til nye Onlinewebben! (OW)</p>
      <p>
        Du kan fortsatt finne den gamle på <a href="https://old.online.ntnu.no">old.online.ntnu.no</a>
      </p>
      <p>
        Oppdager du noen feil, mangler, eller ønsker, send mail til dotkom@online.ntnu.no eller lag et issue på{' '}
        <a href="https://github.com/dotkom/onlineweb-frontend">Github</a>
      </p>
      <Checkbox onChange={(checked) => saveDoNotShow(checked)} label="Ikke vis denne meldingen igjen" />
    </div>
  );
};

const ToastOld: React.FC = () => {
  const [displayMessage] = useToast({ type: 'basic', overwrite: true, duration: 1000 * 60 });
  useEffect(() => {
    // This should be inside of the useEffect
    // With NextJs the window element may be null.
    const showToast = window.localStorage.getItem(HIDE_TOAST);
    // Blame Johannes
    if (showToast != 'true') {
      displayMessage(<Message />);
    }
  }, []);
  return null;
};

export default ToastOld;
