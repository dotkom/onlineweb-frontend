import Heading from 'common/components/Heading';
import React from 'react';
import HobbyGroupList from '../components/HobbyGroupList';
import Intro from '../components/Intro';

const HobbyGroupContainer = () => (
  <section>
    <Heading>Interessegrupper</Heading>
    <Intro />
    <HobbyGroupList />
  </section>
);

export default HobbyGroupContainer;
