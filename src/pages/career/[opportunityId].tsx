import { useRouter } from 'next/router';
import React from 'react';

import DetailView from 'career/containers/DetailView';
import CareerOpportunities from 'career/providers/CareerProvider';

const CareerDetailPage = () => {
  const router = useRouter();
  const opportunityId = Number(router.query.opportunityId);
  return (
    <section>
      <CareerOpportunities>
        <DetailView opportunityId={opportunityId} />
      </CareerOpportunities>
    </section>
  );
};

export default CareerDetailPage;
