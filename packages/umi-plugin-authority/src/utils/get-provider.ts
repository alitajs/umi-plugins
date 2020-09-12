import { utils } from 'umi';
import { join } from 'path';

export default function(util: typeof utils) {
  return `\
import React, { useMemo } from 'react';
import { IRoute } from 'umi';
import Policy from '@pansy/policy';
import { useModel } from '../core/umiExports';
import authorityFactory from '../../authority';
import AuthorityContext, { AuthorityInstance } from './context';
import { traverseModifyRoutes } from '${util.winPath(
    join(__dirname, '..', 'utils', 'runtimeUtil'),
  )}';

type Routes = IRoute[];

interface Props {
  routes: Routes;
  children: React.ReactNode;
}

const AuthorityProvider: React.FC<Props> = props => {
  if (typeof useModel !== 'function') {
    throw new Error('[plugin-authority]: useModel is not a function, @umijs/plugin-initial-state is needed.')
  }

  const { children } = props;
  const { initialState } = useModel('@@initialState');

  const authority: AuthorityInstance = useMemo(() => {
    const { actions = [], policies = [], separator = '/' } = authorityFactory(initialState as any) || {};

    const policy = new Policy(actions, separator);

    policies.forEach((item) => {
      policy.addPolicy(item);
    })

    return policy;
  }, [initialState]);

  if (process.env.NODE_ENV === 'development' && (authority === undefined || authority === null)) {
    console.warn('[plugin-authority]: the authority instance created by authority.ts(js) is nullish, maybe you need check it.');
  }

  props.routes.splice(0, props.routes.length, ...traverseModifyRoutes(props.routes, authority));

  return React.createElement(
    AuthorityContext.Provider,
    { value: authority },
    children,
  );
};

export default AuthorityProvider;
`;
}
