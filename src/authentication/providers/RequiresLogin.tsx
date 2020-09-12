import React from 'react';
import Spinner from 'common/components/Spinner';
import { getUser } from 'authentication/api';
import { useEffect, useState } from 'react';
import { Link } from 'core/components/Router';
import LoginPage from 'pages/login';

const RequiresLogin: React.FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      if (user) {
        setIsLoggedIn(true);
        setIsLoadingUser(false);
      } else {
        setIsLoggedIn(false);
        setIsLoadingUser(false);
      }
    };
    checkUser();
  }, []);

  if (isLoadingUser) return <Spinner />;
  if (!isLoggedIn) return <LoginPage />;
  return <>{props.children}</>;
};

export default RequiresLogin;
