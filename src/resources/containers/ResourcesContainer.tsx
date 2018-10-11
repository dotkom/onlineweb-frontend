import React from 'react';
import ResourceList from '../components/ResourceList';
import Header from 'frontpage/components/Header';

const ResourcesContainer = () => (
  <section id="resourcecenter">
    <div className="container">
      <Header>Ressurssenter</Header>
      <ResourceList />
    </div>
  </section>
);

export default ResourcesContainer;
