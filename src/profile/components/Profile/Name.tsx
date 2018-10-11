import React from 'react';
import style from '../../less/profile.less';

class Name extends React.Component<{name: string}> {
  render() {
    const { name } = this.props;
    return (
      <div className={style.container}>
        <p className={style.name}>{ name }</p>
      </div>
    );
  }
}

export default Name;
