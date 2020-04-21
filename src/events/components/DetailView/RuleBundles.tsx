import React, { FC } from 'react';

import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { ruleBundleSelectors } from 'events/slices/ruleBundles';

import Block from './Block';
import style from './detail.less';

const RuleBox: FC = ({ children }) => <span className={style.ruleBox}>{children}</span>;

interface IProps {
  guestAttendance: boolean;
  bundleIds: number[];
}

export const RuleBundles: FC<IProps> = ({ bundleIds, guestAttendance }) => {
  const bundlesEnabled = bundleIds.length;
  const ruleBundles = useSelector(selectRuleBundlesByIds(bundleIds));

  // Sorting alphabetically on rule_bundle description or rule_string if needed
  // Multiple comparison cases as not all rule_bundles have a description
  const sortedBundles = ruleBundles.sort((bundleA, bundleB) => {
    if (bundleA.description) {
      if (bundleB.description) {
        return bundleA.description.localeCompare(bundleB.description);
      } else {
        return bundleA.description.localeCompare(bundleB.rule_strings[0]);
      }
    } else if (bundleB.description) {
      return bundleA.rule_strings[0].localeCompare(bundleB.description);
    }
    return bundleA.rule_strings[0].localeCompare(bundleB.rule_strings[0]);
  });

  return (
    <Block title="Åpent for" className={style.fullBlock}>
      <div className={style.ruleBoxes}>
        {guestAttendance ? (
          <RuleBox>Alle</RuleBox>
        ) : bundlesEnabled ? (
          sortedBundles.map((bundle) => bundle.rule_strings.map((rule) => <RuleBox key={rule}>{rule}</RuleBox>))
        ) : (
          <RuleBox>Alle medlemmer</RuleBox>
        )}
      </div>
    </Block>
  );
};

const selectRuleBundlesByIds = (bundleIds: number[]) => (state: State) => {
  return ruleBundleSelectors
    .selectAll(state)
    .filter((ruleBundle) => bundleIds.some((bundleId) => bundleId === ruleBundle.id));
};
