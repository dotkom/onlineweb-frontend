import React from 'react';
import { logIn } from '../api';
import style from './login.less';

const LoginView = () => (
  <div className={style.login}>
    <button onClick={() => logIn()} title="Logg inn" />
  </div>
);

export default LoginView;
