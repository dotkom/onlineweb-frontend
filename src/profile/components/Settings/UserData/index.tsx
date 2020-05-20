import { useAsyncDispatch } from 'common/hooks/useAsync';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';

import { Button, Card, Message, TextField } from '@dotkomonline/design-system';
import { anonymizeUser, fetchUserData } from 'profile/api/gdpr';

import style from './userdata.less';
import { useSelector } from 'core/redux/hooks';
import { selectUserName } from 'authentication/selectors/authentication';

interface IUserCredentials {
  username: string;
  password: string;
}

const UserData = () => {
  const username = useSelector(selectUserName());
  const [userCredentials, setUserCredentials] = useState<IUserCredentials>({ username: '', password: '' });

  const aRef = useRef<HTMLAnchorElement>(null);
  const [fileRef, setFileRef] = useState<null | string>(null);

  const [userDataRequest, dispatchUserDataRequest] = useAsyncDispatch(async () => {
    return new File([JSON.stringify(await fetchUserData())], `${username}.json`, {
      type: 'application/json',
    });
  });

  const [deleteUserRequest, dispatchDeleteUserRequest] = useAsyncDispatch(async () => {
    return await anonymizeUser(userCredentials.username, userCredentials.password);
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
