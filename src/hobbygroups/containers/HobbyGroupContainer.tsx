import React from 'react';
import HobbyGroupList from '../components/HobbyGroupList';
import Header from 'frontpage/components/Header';
import Intro from '../components/Intro';

const HobbyGroupContainer = () => (
  <section id="hobbygroups">
    <div className="container">
      <Header>Interessegrupper</Header>
      <Intro />
      <HobbyGroupList />
    </div>
  </section>
);

export default HobbyGroupContainer;
