import useAsync from 'common/hooks/useAsync';
import React, { SyntheticEvent, useEffect, useRef } from 'react';

import { Button, Card, TextField, Message } from '@dotkomonline/design-system';
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

  

  const [downloadUserDataState, setDownloadUserDataState] = React.useState(false);
  const [userCredentials, setUserCredentials] = React.useState<IUserCredentials>({ username: '', password: '' });
  const [deleteUserState, setDeleteUserState] = React.useState(false);

  const aRef = useRef<HTMLAnchorElement>(null);
  const [fileRef, setFileRef] = React.useState<null | string>(null);
  const useDataRequest = useAsync<File | null, Error>(async () => {
    if (downloadUserDataState && user) {
      return new File([JSON.stringify(await fetchUserData(user))], `${user.profile.preferred_username}.json`, {
        type: 'application/json',
      });
    }
    return null;
  }, [downloadUserDataState, user]);

  const deleteUserRequest = useAsync<unknown, Error>(async () => {
    if (deleteUserState && user) {
      return await anonymizeUser(user, user.profile.sub, userCredentials.username, userCredentials.password);
    }
    return null;
  }, [deleteUserState]);
  

  useEffect(() => {
    if (useDataRequest.status === 'resolved') {
      const ref = URL.createObjectURL(useDataRequest.result);
      setFileRef(ref);
      return () => {
        URL.revokeObjectURL(ref);
        setFileRef(null);
      };
    }
    return;
  }, [useDataRequest]);

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
    init: 'primary'
  }[useDataRequest.status] as 'danger' | 'success' | 'primary';
  
  return (
    <>
      {useDataRequest.status === 'rejected' ? <Message status="error">{useDataRequest.error.message}</Message> : null}
      {deleteUserRequest.status === 'rejected' ? <Message status="error">{deleteUserRequest.error.message}</Message> : null}
      <Card className={style.userDataCard}>
        <h1>Din data</h1>
        <Button color={dlButtonColor} onClick={() => setDownloadUserDataState(true)}>
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
        <Button color="danger" onClick={() => setDeleteUserState(true)}>
          Slett bruker
        </Button>
      </Card>
    </>
  );
};

export default UserData;