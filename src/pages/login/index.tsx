import { LoginSection } from 'authentication/components/Login';
import React from 'react';
import style from './login.less';

const LoginPage = () => {
  return (
    <div>
      <p>Siden du forsøkte å nå krever innlogging.</p>
      <LoginSection className={style.loginMenu} />
    </div>
  );
};

export default LoginPage;
