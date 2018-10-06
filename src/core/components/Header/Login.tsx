import React from 'react';

export default () => (
  {/*% if user.is_authenticated %}
      <li>
          <a href="#login_menu" class="dropdown-toggle dropdown-signin login glyphicon glyphicon-user" data-toggle="dropdown"></a>
          <span class="username_menu hidden-xs hidden-sm hidden-md">
              {{ user.username }}
          </span>

          <ul class="dropdown-menu login-box" role="menu">
              {% if user.is_staff %}
                  <li><a href="/admin/">Administrasjon</a></li>
              {% endif %}
              {% if user.is_committee %}
                  <li><a href="/dashboard/">Dashboard</a></li>
              {% endif %}
              <li>
                  <a href="{% url 'profiles' %}">
                      Min side<span class="hidden-lg">: {{ user.username }}</span>
                      {% if feedback_pending %}
                          ({{ feedback_pending|length }})
                      {% endif %}
                  </a>
              </li>
              <li><a href="{% url 'contact_index' %}">Kontakt oss</a></li>
              <li><a href="{% url 'profiles_user_search' %}">Finn brukere</a></li>
              <li className="divider"></li>
              <li><a href="{% url 'auth_logout' %}">Logg ut</a></li>
          </ul>
      </li>
  {% else %}
      <li>
          <a href="#login_menu" class="dropdown-toggle dropdown-signin login glyphicon glyphicon-lock" data-toggle="dropdown"></a>
          <ul class="dropdown-menu login-box" role="menu">
              <li>
                  <form class="navbar-form" method="POST" action="{% url 'auth_login' %}">
                      {% csrf_token %}
                      <fieldset className="textbox">
                          <div className="input-group">
                              <label for="id_username">Brukernavn</label>
                              <input type="text" name="username" id="id_username" className="form-control">
                          </div>
                          <div className="input-group">
                              <label for="id_password">Passord</label>
                              <input type="password" name="password" id="id_password" className="form-control">
                          </div>
                      </fieldset>
                      <input type="hidden" name="next" value="{{ request.get_full_path }}" />
                      <button type="submit" className="btn btn-primary">Logg inn</button>
                  </form>
                  <div id="login-form-btn-group">
                      <a className="btn btn-default" href="{% url 'auth_register' %}">Registrer</a>
                      <a className="btn btn-default" href="{% url 'auth_recover' %}">Glemt passord</a>
                  </div>
              </li>
          </ul>
      </li>
  {% endif %*/}
)