import React, { useContext } from 'react';

import { Button } from 'core/components/errors/NotAuthenticated/Button';
import { ProfileSearchContext } from 'profile/providers/SearchFilter';

import ProfileSmall from './ProfileSmall';
import style from './search.less';

export const Users = () => {
  const { users, nextPage } = useContext(ProfileSearchContext);
  if (users.length === 0) {
    return <h3 className={style.marginTop}>Finner ingen brukere med disse filterene</h3>;
  }
  return (
    <>
      <div className={style.smallProfileGrid}>
        {users.map((user) => (
          <ProfileSmall user={user} key={user.username} />
        ))}
      </div>
      <div className={style.marginTop}>
        <Button onClick={nextPage}>Last inn mer</Button>
      </div>
    </>
  );
};

export default Users;
