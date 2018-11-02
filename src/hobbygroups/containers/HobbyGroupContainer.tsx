import React from 'react';
import HobbyGroupList from '../components/HobbyGroupList';
import Heading from 'common/components/Heading';
import Intro from '../components/Intro';

const HobbyGroupContainer = () => (
  <section>
    <Heading>Interessegrupper</Heading>
    <Intro />
    <HobbyGroupList />
  </section>
);

export default HobbyGroupContainer;
