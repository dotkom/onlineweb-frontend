import React, { useContext, useEffect, useState } from 'react';

import { useIntersection } from 'common/hooks/useIntersection';
import { Link } from 'core/components/Router';
import { ProfileSearchContext } from 'profile/providers/SearchFilter';

import { routes } from 'profile';
import ProfileSmall from './ProfileSmall';
import style from './search.less';

export const Users = () => {
  const { users, nextPage } = useContext(ProfileSearchContext);
  const [entry, targetRef] = useIntersection();
  const [count, setCount] = useState(0); // TODO: Implement inside useIntersection somehow.

  useEffect(() => {
    if (entry && entry.isIntersecting && count !== 0) {
      nextPage();
    }
    // TODO: Figure out why this is needed, and implement it inside the hook.
    setCount((stateCount) => stateCount + 1);
  }, [entry]);

  return (
    <>
      {!users.length ? (
        <div className={style.marginTop}>
          <h3>Finner ingen brukere med disse filterene</h3>
        </div>
      ) : (
        <div className={style.smallProfileGrid}>
          {users.map((user) => (
            <Link to={routes.public + `/${user.id}`} key={`${user.id} ${user.first_name} ${user.last_name}`}>
              <ProfileSmall user={user} key={user.username} />
            </Link>
          ))}
        </div>
      )}
      <div ref={targetRef} />
    </>
  );
};

export default Users;
