import React from 'react';
import style from '../../less/profile.less';

export interface IProps {
  name: string;
  icon: string;
}

class InfoGroup extends React.Component<IProps> {
  public render() {
    const { children, name } = this.props;
    return (
      <div className={style.infoGroup}>
        {/*<img className="profile-group-icon" src={`${STATIC_URL + icon}.svg`} />*/}
        <h1>{name}</h1>
        <div className={style.groupWrapper}>{children}</div>
      </div>
    );
  }
}

export default InfoGroup;
