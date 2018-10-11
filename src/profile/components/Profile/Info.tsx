import React from 'react';
import style from '../../less/profile.less';

export interface Props {
  type: string;
  content: string;
}

class Info extends React.Component<Props> {
  render() {
    const { type, content } = this.props;
    return (
      <div className={style.infoWrapper}>
        <p className={style.infoType}>{ type }</p>
        <p className={style.infoContent}>{ content }</p>
      </div>
    );
  }
}

export default Info;
