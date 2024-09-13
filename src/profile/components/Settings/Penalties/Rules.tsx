import React from 'react';
import { useRouter } from 'next/router';

import { useCollapse } from 'common/hooks/collapsible';

import { md } from 'common/components/Markdown';

import style from './penalties.less';
import { IMarkRule } from 'profile/models/Penalty.js';

interface IProps {
  rules: IMarkRule[];
}

export const Info = ({ rules }: IProps) => {
  const rulesId = 'rules';

  const { asPath } = useRouter();
  const hash = asPath.split('#')[1];

  const [collapsed, toggleCollapse] = useCollapse(hash !== rulesId);

  const ruleset = rules.length
    ? rules[0].content
    : 'Det er ingen prikkeregler enda. Kontakt styret for mer informasjon.';

  return (
    <>
      <h2>Regler</h2>
      <button className={style.toggleRules} onClick={toggleCollapse}>
        {collapsed ? 'Vis regler' : 'Skjul regler'}
      </button>
      {!collapsed && (
        <div id={rulesId} className={style.rules}>
          {md`${ruleset}`}
        </div>
      )}
    </>
  );
};

export default Info;
