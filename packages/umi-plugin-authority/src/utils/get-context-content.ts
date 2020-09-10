export default function() {
  return `\
import React from 'react';
import Policy from '@pansy/policy';

export type AuthorityInstance = Policy;

const AuthorityContext = React.createContext<AuthorityInstance>(null!);

export default AuthorityContext;
`;
}
