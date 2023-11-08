import { FC, useEffect, useRef, useState } from 'react';
import {
  committeeUpdateSelectors,
  fetchCommitteeUpdatesList,
  nextCommitteeUpdatePage,
} from 'committeeupdates/slices/committeeupdates';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import Heading from 'common/components/Heading';
import { State } from 'core/redux/Store';
import { StatusUpdate } from './StatusUpdate';
import style from './committee.less';

interface CommitteeStatusProps {}

export const CommitteeStatus: FC<CommitteeStatusProps> = ({}) => {
  const ulRef = useRef<HTMLUListElement>(null);

  const dispatch = useDispatch();
  const committeeUpdates = useSelector(selectCommitteeUpdates(), shallowEqual);
  const page = useSelector(selectCurrentPage());
  const pageSize = useSelector(selectPageSize());

  const isPending = useSelector(selectIsSearchPending());
  const totalCount = useSelector(selectTotalCount());
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const isSearchNotCompleted = Math.max(Math.ceil(totalCount / pageSize), 1) >= page;

  useEffect(() => {
    dispatch(fetchCommitteeUpdatesList());
  }, [page]);

  useEffect(() => {
    if (isIntersecting && !isPending && isSearchNotCompleted && !isTimedOut) {
      setIsTimedOut(true);
      setIsIntersecting(false);
      dispatch(nextCommitteeUpdatePage());

      setTimeout(() => {
        setIsTimedOut(false);
      }, 500);
    }
  }, [dispatch, isSearchNotCompleted, isPending, isIntersecting, isTimedOut]);

  const handleScroll = () => {
    const ul = ulRef.current;
    if (ul) {
      const scrollPosition = ul.scrollTop;
      const scrollHeight = ul.scrollHeight - ul.clientHeight;
      if (scrollHeight + scrollPosition <= 10 && !isPending && isSearchNotCompleted) {
        setIsIntersecting(true);
      } else {
        setIsIntersecting(false);
      }
    }
  };

  useEffect(() => {
    const ul = ulRef.current;
    if (ul) {
      console.log('Adding scroll');
      ul.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (ul) {
        ul.removeEventListener('scroll', handleScroll);
      }
    };
  }, [dispatch]);

  return (
    <section className={style.committee}>
      <Heading title="Komitéoppdateringer" />
      <div>
        <ul ref={ulRef} className={style.updateList}>
          {!isPending && committeeUpdates.length === 0 && (
            <span>Ingen oppdateringer</span>
          )}
          {committeeUpdates.map((update, i) => (
            <StatusUpdate key={`${update.id}-${i}`} data={update} />
          ))}
          {isPending && (
            <span>Loading...</span>
          )}
        </ul>
      </div>
    </section>
  );
};

const selectCommitteeUpdates = () => (state: State) => {
  const updates = committeeUpdateSelectors.selectAll(state);
  return updates.sort((a, b) => (DateTime.fromISO(a.created_at) > DateTime.fromISO(b.created_at) ? -1 : 1));
};

const selectIsSearchPending = () => (state: State) => {
  return state.committeeUpdates.search.loading === 'pending';
};

const selectTotalCount = () => (state: State) => {
  return state.committeeUpdates.search.count;
};

const selectCurrentPage = () => (state: State) => {
  return state.committeeUpdates.search.page;
};

const selectPageSize = () => (state: State) => {
  return state.committeeUpdates.search.pageSize;
};
