import React from 'react';
import LoginPage from 'pages/login';
import { useSession } from 'next-auth/client';
import Spinner from 'common/components/Spinner';

const RequiresLogin: React.FC = (props) => {
  const [session, loading] = useSession();

  if (loading) return <Spinner />;
  if (!session) return <LoginPage />;
  return <>{props.children}</>;
};

export default RequiresLogin;
