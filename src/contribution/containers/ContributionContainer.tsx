import Heading from 'common/components/Heading';
import React from 'react';
import Intro from '../components/Intro';
import RepositoryList from '../components/RepositoryList';

const ContributionContainer = () => (
  <section id="contributions">
    <div className="container">
      <Heading>Bidra til Onlinernes digitale hverdag!</Heading>
      <Intro />
      <RepositoryList />
    </div>
  </section>
);

export default ContributionContainer;
