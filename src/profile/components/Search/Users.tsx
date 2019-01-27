import React, { useContext } from 'react';

import { Pagination } from 'common/components/Pagination';
import { ProfileSearchContext } from 'profile/providers/SearchFilter';

import ProfileSmall from './ProfileSmall';
import style from './search.less';

export const Users = () => {
  const { users, page, setPage } = useContext(ProfileSearchContext);
  return (
    <>
      <div className={style.smallProfileGrid}>
        {users.map((user) => (
          <ProfileSmall user={user} />
        ))}
      </div>
      <Pagination page={page} count={10} setPage={setPage} />
    </>
  );
};

export default Users;
