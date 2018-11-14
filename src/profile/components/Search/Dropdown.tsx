import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import Collapsible from 'common/components/Collapsible';
import { IGroup } from 'core/models/Group';
import React, { ReactChild } from 'react';
import style from './search.less';

export interface IProps {
  selected: string | undefined;
  groups: IGroup[];
  onClick: (g: IGroup) => boolean;
}

class Dropdown extends Collapsible<IProps> {
  public render() {
    const { groups, selected, onClick } = this.props;
    const { collapsed } = this.state;
    return (
      <div className={style.dropdown}>
        <Item selected={!selected || true} onClick={() => this.toggleCollapse()}>
          <p>{selected || 'Velg en gruppe'}</p>
          <FontAwesomeIcon icon={faSortDown} />
        </Item>
        {!collapsed && (
          <div className={style.dropdownItems}>
            {groups.map((group) => (
              <Item
                key={group.name}
                selected={group.name === selected}
                onClick={() => {
                  onClick(group);
                  this.toggleCollapse();
                }}
              >
                <p>{group.name}</p>
              </Item>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export interface IItemProps {
  children: ReactChild;
  selected: boolean;
  onClick: () => void;
}

const Item = ({ children, selected = false, onClick }: IItemProps) => (
  <div className={classnames(style.dropdownItem, { [style.dropdownSelected]: selected })} onClick={() => onClick()}>
    {children}
  </div>
);

export default Dropdown;
