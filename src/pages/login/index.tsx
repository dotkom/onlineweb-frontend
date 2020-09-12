import React from 'react';
import { logIn } from 'authentication/api';
import style from './login.less';
import { Button } from '@dotkomonline/design-system';

const LoginPage = () => {
  return (
    <div>
      <p>Siden du forsøkte å nå krever innlogging.</p>
      <div className={style.loginMenu}>
        <Button className={style.loginButton} onClick={logIn}>
          Logg inn
        </Button>
        <Button>Registrer</Button>
        <Button>Glemt passord</Button>
      </div>
    </div>
  );
};

export default LoginPage;
