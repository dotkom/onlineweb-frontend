import React, { FC } from 'react';

import style from './table.less';

export interface IProps {
  headers: string[];
  title?: string;
}

export const Table: FC<IProps> = ({ headers, title, children }) => {
  return (
    <div className={style.container}>
      <table>
        {title ? <caption>{title}</caption> : null}
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                <h3 className={style.header}>{header}</h3>
                <div className={style.headerBorder} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
