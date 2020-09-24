// @ts-nocheck;
import React, { useEffect } from 'react';
import { useToast } from 'core/utils/toast/useToast';
import { Checkbox } from '@dotkomonline/design-system';


const HIDE_TOAST = 'hideOldOWToast';
const SESSION_HIDE_TOAST = 'hideToastForSession'

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

    const permanentlyHiddenToast = window.localStorage.getItem(HIDE_TOAST) === 'true'
    const sessionHiddenToast = window.sessionStorage.getItem(SESSION_HIDE_TOAST) === 'true'

    // Blame Johannes
    if (!permanentlyHiddenToast && !sessionHiddenToast) {
      displayMessage(<Message />);
      window.sessionStorage.setItem(SESSION_HIDE_TOAST, 'true')
    }
  }, []);
  return null;
};

export default ToastOld;
