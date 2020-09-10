export default function() {
  return `\
import React, { useContext } from 'react';
import AuthorityContext, { AuthorityInstance as AuthorityInstanceType } from './context';

export type AuthorityInstance = AuthorityInstanceType;

export const useAuthority = () => {
  return useContext(AuthorityContext);
};

export interface AuthorityProps {
  accessible: boolean;
  fallback?: React.ReactNode;
}

export const Authority: React.FC<AuthorityProps> = props => {
  const { accessible, fallback, children } = props;

  if (process.env.NODE_ENV === 'development' && typeof accessible === 'function') {
    console.warn(
      '[plugin-access]: provided "accessible" prop is a function named "' +
        (accessible as Function).name +
        '" instead of a boolean, maybe you need check it.',
    );
  }

  return <>{accessible ? children : fallback}</>;
};
`;
}
