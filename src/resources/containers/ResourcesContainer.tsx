import React from 'react';
import ResourceList from '../components/ResourceList';

const ResourcesContainer = () => (
  <section id="resourcecenter">
    <div className="container">
      <div className="col-md-12">
        <div className="page-header">
          <h1 id="resourcecenter-heading">Ressurssenter</h1>
        </div>
      </div>
      <ResourceList />
    </div>
  </section>
);

export default ResourcesContainer;
