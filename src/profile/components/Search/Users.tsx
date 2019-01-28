import React, { useContext } from 'react';

import { ProfileSearchContext } from 'profile/providers/SearchFilter';

import ProfileSmall from './ProfileSmall';
import style from './search.less';

export const Users = () => {
  const { users, nextPage } = useContext(ProfileSearchContext);
  return (
    <>
      <div className={style.smallProfileGrid}>
        {users.map((user) => (
          <ProfileSmall user={user} key={user.username} />
        ))}
      </div>
      <button onClick={nextPage}>Neste side</button>
    </>
  );
};

export default Users;
