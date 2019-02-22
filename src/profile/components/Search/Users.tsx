import React, { useContext } from 'react';

import { Button } from 'core/components/errors/NotAuthenticated/Button';
import { Link } from 'core/components/Router';
import { ProfileSearchContext } from 'profile/providers/SearchFilter';

import { routes } from 'profile';
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
          <Link to={routes.public + `/${user.id}`}>
            <ProfileSmall user={user} key={user.username} />
          </Link>
        ))}
      </div>
      <div className={style.marginTop}>
        <Button onClick={nextPage}>Last inn mer</Button>
      </div>
    </>
  );
};

export default Users;
