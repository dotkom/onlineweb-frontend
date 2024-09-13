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

const getLatestRuleSet = (rules: IMarkRule[]): IMarkRule | null => {
  if (rules.length === 0) {
    return null;
  }

  const now = new Date();

  const ruleset = rules.reduce((latest, rule) => {
    const isLatestInFuture = new Date(latest.valid_from_date) > now;
    const isRuleInFuture = new Date(rule.valid_from_date) > now;

    if (isRuleInFuture) {
      return latest;
    }

    if (isLatestInFuture || rule.valid_from_date > latest.valid_from_date) {
      return rule;
    }

    return latest;
  }, rules[0]);

  return new Date(ruleset.valid_from_date) > now ? null : ruleset;
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
