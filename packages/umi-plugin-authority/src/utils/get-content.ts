export default function() {
  return `\
import React, { useContext } from 'react';
import Policy from '@pansy/policy';
import AuthorityContext from './context';

export type AuthorityInstance = Policy;

export const useAuthority = () => {
  return useContext(AuthorityContext);
};

export interface AuthorityProps {
  access?: string | string[];
  accessible?: boolean;
  fallback?: React.ReactNode;
}

const checkAuthority = (policy: Policy, access: string | string[]): boolean => {
  let result = true;

  if (policy) {
    // 数组处理
    if (Array.isArray(access)) {
      if (!policy.multipleVerify(access)) {
        result = false;
      }
    }

    // string 处理
    if (typeof access === 'string') {
      if (!policy.combinationVerify(access)) {
        result = false;
      }
    }
  }

  return result;
};

export const Authority: React.FC<AuthorityProps> = (props) => {
  const { access, fallback, children } = props;
  const policy = useContext(AuthorityContext);

  const checkResult = checkAuthority(policy, access);

  const accessible = ('accessible' in props) ? props.accessible : checkResult;


  if (typeof children === 'function') {
    return <>{children(accessible)}</>;
  }

  return <>{accessible ? children : fallback}</>;
};
`;
}
