import React from 'react';
import { logIn } from '../api';
import style from './login.less';

const LoginView = () => (
  <div className={style.login}>
    <button onClick={() => logIn('', '')}>Logg inn</button>
  </div>
)

export default LoginView;
