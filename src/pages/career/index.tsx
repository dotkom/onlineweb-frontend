import React from 'react';

import FilterableJobList from 'career/containers/FilterableJobList';
import CareerOpportunities from 'career/providers/CareerProvider';

const CareerListPage = () => {
  return (
    <section>
      <CareerOpportunities>
        <FilterableJobList />
      </CareerOpportunities>
    </section>
  );
};

export default CareerListPage;
