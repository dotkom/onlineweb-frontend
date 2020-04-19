import { useAsyncDispatch } from 'common/hooks/useAsync';
import React, { SyntheticEvent, useEffect, useRef } from 'react';

import { Button, Card, Message, TextField } from '@dotkomonline/design-system';
import { IUserContext, UserContext } from 'authentication/providers/UserProvider';
import { anonymizeUser, fetchUserData } from 'profile/api/gdpr';

import style from './userdata.less';

interface IUserCredentials {
  username: string;
  password: string;
}

const UserData = () => {
  const userContext = React.useContext<IUserContext>(UserContext);
  const user = userContext.user;

  const [userCredentials, setUserCredentials] = React.useState<IUserCredentials>({ username: '', password: '' });

  const aRef = useRef<HTMLAnchorElement>(null);
  const [fileRef, setFileRef] = React.useState<null | string>(null);

  const [userDataRequest, dispatchUserDataRequest] = useAsyncDispatch(async () => {
    if (user) {
      return new File([JSON.stringify(await fetchUserData(user))], `${user.profile.preferred_username}.json`, {
        type: 'application/json',
      });
    }
    throw new Error('User not logged in');
  });

  const [deleteUserRequest, dispatchDeleteUserRequest] = useAsyncDispatch(async () => {
    if (user) {
      return await anonymizeUser(user, user.profile.sub, userCredentials.username, userCredentials.password);
    }
    throw new Error('User not logged in');
  });

  useEffect(() => {
    if (userDataRequest.status === 'resolved') {
      const ref = URL.createObjectURL(userDataRequest.result);
      setFileRef(ref);
      return () => {
        URL.revokeObjectURL(ref);
        setFileRef(null);
      };
    }
    return;
  }, [userDataRequest]);

  useEffect(() => {
    if (aRef.current !== null) {
      aRef.current.click();
      setFileRef(null);
    }
  }, [fileRef]);

  const dlButtonColor = {
    rejected: 'danger',
    resolved: 'success',
    pending: 'primary',
    init: 'primary',
  }[userDataRequest.status] as 'danger' | 'success' | 'primary';

  return (
    <>
      {userDataRequest.status === 'rejected' ? (
        <Message status="error">{(userDataRequest.error as Error).message}</Message>
      ) : null}
      {deleteUserRequest.status === 'rejected' ? (
        <Message status="error">{(deleteUserRequest.error as Error).message}</Message>
      ) : null}
      <Card className={style.userDataCard}>
        <h1>Din data</h1>
        <Button color={dlButtonColor} onClick={dispatchUserDataRequest}>
          Last ned brukerdata
        </Button>

        {fileRef ? (
          <a ref={aRef} download href={fileRef}>
            Lagre som
          </a>
        ) : null}
      </Card>

      <Card className={style.userDataCard}>
        <h1>Slett din bruker</h1>
        <TextField
          value={userCredentials.username}
          onChange={(v: SyntheticEvent<HTMLInputElement>) =>
            setUserCredentials({ username: v.currentTarget.value, password: userCredentials.password })
          }
          placeholder="Brukernavn"
        />
        <TextField
          type="password"
          value={userCredentials.password}
          onChange={(v: SyntheticEvent<HTMLInputElement>) =>
            setUserCredentials({ password: v.currentTarget.value, username: userCredentials.username })
          }
          placeholder="Passord"
        />
        <Button color="danger" onClick={dispatchDeleteUserRequest}>
          Slett bruker
        </Button>
      </Card>
    </>
  );
};

export default UserData;
