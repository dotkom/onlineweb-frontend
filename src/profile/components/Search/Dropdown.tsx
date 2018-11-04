import style from './search.less';
import React, { ReactChild } from 'react';
import Collapsible from 'common/components/Collapsible';
import { IGroup } from 'core/models/Group';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons/faSortDown';


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
      <div className={classnames(style.dropdownContainer, style.searchField)}>
        {collapsed ? (
          <Item selected={!selected || true} onClick={() => this.toggleCollapse()}>
            <h4>{selected || 'Velg en gruppe'}</h4>
            <FontAwesomeIcon icon={faSortDown} />
          </Item>
        ) : (
          groups.map((group) => (
            <Item
              key={group.name}
              selected={group.name === selected}
              className={style.dropped}
              onClick={() => {
                onClick(group);
                this.toggleCollapse();
              }}
            >
              <h4>{group.name}</h4>
            </Item>
          ))
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
