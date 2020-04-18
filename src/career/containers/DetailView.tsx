import React, { FC, useEffect } from 'react';

import { careerOpportunitySelectors, fetchCareerOpportunityById } from 'career/slices/careerOpportunities';
import Spinner from 'common/components/Spinner';
import HttpError from 'core/components/errors/HttpError';
import { useDispatch, useSelector } from 'core/redux/hooks';

import JobDetails from '../components/JobDetails';

interface IProps {
  opportunityId: number;
}

const DetailView: FC<IProps> = ({ opportunityId }) => {
  const dispatch = useDispatch();
  const opportunity = useSelector((state) => careerOpportunitySelectors.selectById(state, opportunityId));
  const isPending = useSelector((state) => state.careerOpportunities.loading === 'pending');

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchCareerOpportunityById(opportunityId));
  }, [opportunityId, dispatch]);

  if (isPending && !opportunity) {
    return <Spinner />;
  }

  if (!opportunity) {
    return <HttpError code={404} text="Denne karrieremuligheten eksisterer ikke." />;
  }

  return <JobDetails opportunity={opportunity} />;
};

export default DetailView;
