import { listResource, retrieveResource } from 'common/resources';
import { IQueryObject } from 'common/utils/queryString';
import { IRuleBundle } from 'events/models/RuleBundles';

const RULE_BUNDLE_API_URL = '/api/v1/event/rule-bundles';

interface IRuleBundleFilters extends IQueryObject {
  event?: number;
}

export const listRuleBundles = listResource<IRuleBundle, IRuleBundleFilters>(RULE_BUNDLE_API_URL);
export const retrieveRuleBundle = retrieveResource<IRuleBundle>(RULE_BUNDLE_API_URL);
