import React from 'react';
import { useRouter } from 'next/router';

import { useCollapse } from 'common/hooks/collapsible';

import { md } from 'common/components/Markdown';

import style from './penalties.less';
import { IMarkRule } from 'profile/models/Penalty.js';

interface IProps {
  rules: IMarkRule[];
}

const NO_RULES = 'Det er ingen prikkeregler enda. Kontakt styret for mer informasjon.';

const inFuture = (date: string) => new Date(date) > new Date();

const getLatestRuleSet = (rules: IMarkRule[]): IMarkRule | null => {
  if (rules.length === 0) {
    return null;
  }

  if (rules.length === 1) {
    return rules[0];
  }

  return rules.reduce((latest, rule) => {
    if (inFuture(rule.valid_from_date)) {
      return latest;
    }

    return rule.valid_from_date > latest.valid_from_date ? rule : latest;
  }, rules[0]);
};

export const Info = ({ rules }: IProps) => {
  const rulesId = 'rules';

  const { asPath } = useRouter();
  const hash = asPath.split('#')[1];

  const [collapsed, toggleCollapse] = useCollapse(hash !== rulesId);

  const ruleset = getLatestRuleSet(rules)?.content ?? NO_RULES;

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
