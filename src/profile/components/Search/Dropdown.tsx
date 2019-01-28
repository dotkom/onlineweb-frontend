import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { faSortUp } from '@fortawesome/free-solid-svg-icons/faSortUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import React from 'react';

import Collapsible from 'common/components/Collapsible';

import style from './search.less';

export interface IProps {
  selected: string | undefined;
  groups: string[];
  onClick: (g: string) => void;
}

class Dropdown extends Collapsible<IProps> {
  public render() {
    const { groups, selected, onClick } = this.props;
    const { collapsed } = this.state;
    return (
      <div className={style.dropdown}>
        <Item selected={!selected || true} onClick={() => this.toggleCollapse()}>
          <p>{selected || 'Velg en gruppe'}</p>
          <FontAwesomeIcon icon={collapsed ? faSortDown : faSortUp} />
        </Item>
        {!collapsed && (
          <div className={style.dropdownItems}>
            {groups.map((group) => (
              <Item
                key={group}
                selected={group === selected}
                onClick={() => {
                  onClick(group);
                  this.toggleCollapse();
                }}
              >
                <p>{group}</p>
              </Item>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export interface IItemProps {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

const Item = ({ children, selected = false, onClick }: IItemProps) => (
  <div className={classnames(style.dropdownItem, { [style.dropdownSelected]: selected })} onClick={onClick}>
    {children}
  </div>
);

export default Dropdown;
