import React from 'react';

const Subnav = () => (
  <nav className="subnavbar">
    <div className="container">
      <ul>
        <li className="top-menu-link">
          <a data-section="events" className="active" href="{% url 'events-link' %}">Arrangementer</a>
        </li>
        <li className="top-menu-link">
          <a data-section="articles" href="{% url 'articles-link' %}">Artikler</a>
        </li>
        <li className="top-menu-link">
          <a data-section="offline" href="{% url 'offline-link' %}">Offline</a>
        </li>
        <li className="top-menu-link">
          <a data-section="business" href="{% url 'business-link' %}">For bedrifter</a>
        </li>
        <li className="top-menu-link">
          <a data-section="about" href="{% url 'about-link' %}">Om Online</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Subnav;
