import React, { Component, ReactChildren } from 'react';
import { Link } from 'react-router-dom';
import style from './menu.less';
import classnames from 'classnames';

export interface IProps {
  match: any;
  children: JSX.Element;
}

class MainMenu extends Component<IProps, {}> {
  public render() {
    const pages = [
      { link: 'me', view: 'Min Profil' },
      { link: 'search', view: 'Brukersøk' },
      { link: 'settings', view: 'Innstillinger' },
    ];
    // Yeah, I know...
    const current = this.props.match.path.split('/').reverse()[0];
    console.log(current);
    return(
      <div>
        <div className={style.menuGrid}>
          { pages.map((page) => (
            <Link to={page.link} key={page.link} className={style.removeUnderline}>
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
    );
  }
}

export interface IElementProps {
  text: string;
  clicked: boolean;
}

const MenuElement = ({ text, clicked }: IElementProps) => (
  <div className={classnames(style.menuGridRow, { [style.menuClicked]: clicked })}>
    <h4 className={style.menuText}>{ text }</h4>
  </div>
);

export default MainMenu;
