import React, { Component, ReactChildren } from 'react';
import { Link } from 'react-router-dom';
import './menu.less';

export interface IProps {
  match: any;
  children: JSX.Element;
}

class MainMenu extends Component<IProps, {}> {
  render() {
    const pages = [
      { link: 'me', view: 'Min Profil' },
      { link: 'search', view: 'Brukersøk' },
      { link: 'settings', view: 'Innstillinger' }
    ]
    // Yeah, I know...
    const current = this.props.match.path.split('/').reverse()[0];
    console.log(current)
    return(
      <div>
        <div className="profile-menu-grid">
          { pages.map((page) => (
            <Link to={page.link} key={page.link} className="remove-underline">
              <MenuElement
                text={page.view}
                clicked={current === page.link}
              />
            </Link>
          )) }
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export interface IElementProps {
  text: string;
  clicked: boolean;
}

const MenuElement = ({ text, clicked }: IElementProps) => (
  <div className={'profile-menu-grid-row' + (clicked ? ' profile-menu-clicked' : '')}>
    <h4 className="profile-menu-text">{ text }</h4>
  </div>
)

export default MainMenu;
