import React from 'react';
import style from '../../less/profile.less';

export interface IProps {
  type: string;
  content: string;
}

class Info extends React.Component<IProps> {
  public render() {
    const { type, content } = this.props;
    return (
      <div>
        <p className={style.infoType}>{type}</p>
        <p>{content}</p>
      </div>
    );
  }
}

export default Info;
