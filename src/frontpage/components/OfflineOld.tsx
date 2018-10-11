import React from 'react';
import { Link } from 'react-router-dom';

const Offine = () => (
  <section id="offline">
    <div className="page-header clearfix">
      <div className="row">
        <div className="col-md-8 col-xs-6">
          <h1 id="offline-heading">Offline</h1>
        </div>
        <div className="col-md-4 col-xs-6 archive-link">
          <a href="{% url 'offline' %}">Arkiv<i className="glyphicon glyphicon-chevron-right"></i></a>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <div className="ingress">
        </div>
      </div>
      <div className="col-md-6">
        <div id="offlineCarousel" className="carousel slide">
          <div className="carousel-inner"></div>
          <a className="carousel-control left" href="#offlineCarousel" data-slide="prev"><span className="glyphicon glyphicon-chevron-left"></span></a>
          <a className="carousel-control right" href="#offlineCarousel" data-slide="next"><span className="glyphicon glyphicon-chevron-right"></span></a>
        </div>
      </div>
    </div>
  </section>
);

export default Offine;
