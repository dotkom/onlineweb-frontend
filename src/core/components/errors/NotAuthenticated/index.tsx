import React from 'react';

import { logIn } from 'authentication/api';
import Markdown from 'common/components/Markdown';

import { Button } from './Button';
import { Lock } from './Lock';
import style from './notAuthenticated.less';

const ABOUT_NOT_AUTHENTICATED = `
  # Logg inn

  #### Vennligst logg inn for å se innholdet på denne siden
`;

export const NotAuthenticated = () => {
  return (
    <div className={style.container}>
      <Markdown source={ABOUT_NOT_AUTHENTICATED} />
      <div className={style.icon}>
        <Lock />
      </div>
      <div className={style.buttons}>
        <Button inverse onClick={logIn} title="Registrer">
          Registrer
        </Button>
        <Button onClick={logIn} title="Logg inn">
          Logg inn
        </Button>
      </div>
    </div>
  );
};
