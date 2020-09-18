import React from 'react';
import LoginPage from 'pages/login';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from 'authentication/selectors/authentication';

const RequiresLogin: React.FC = (props) => {
  const isLoggedIn = useSelector(selectIsLoggedIn());

  if (!isLoggedIn) return <LoginPage />;
  return <>{props.children}</>;
};

export default RequiresLogin;
