import React from 'react';
import Spinner from "common/components/Spinner";
import { getUser } from "authentication/api";
import { useEffect, useState } from "react";

const RequiresLogin: React.FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      if (user) {
        setIsLoggedIn(true);
        setIsLoadingUser(false)
      }
      else {
        setIsLoggedIn(false);
        setIsLoadingUser(false);
      }
    }
    checkUser();
  }, []);

  if (isLoadingUser) return (<Spinner />);
  if (!isLoggedIn) return (<p>Du må være logget inn for å se denne siden.</p>);
  return <>{props.children}</>;
}

export default RequiresLogin;