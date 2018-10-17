import React, { Component } from 'react';

export interface IState {
  collapsed: boolean;
}

/**
 * @summary Component defining the ability to toggle displaying its content.
 * @description Component defines a method toggleCollapse that lets it content be collapsed and shown again by toggling.
 * To implement it, simply extend this Component.
 * In the render method; use the toggleCollapse method on the trigger button.
 * Then implement a condition for which part(s) will be hidden,
 * e.g. { this.state.collapsed ? <if-hidden> : <if-visible> }.
 * @param {generic} T Props definition for the Component.
 */
abstract class Collapsible<T> extends Component<T, IState> {
  public state = {
    collapsed: true,
  };

  /**
   * @summary Method from the abstract Component; Collapsible.
   * @description Method toggles the state of the Component to show or hide a given portion of its content.
   */
  public toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }
}

export default Collapsible;
