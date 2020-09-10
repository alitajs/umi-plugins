export default function() {
  return `\
import React from 'react';
import authorityFactory from '@/authority';

export type AuthorityInstance = ReturnType<typeof authorityFactory>;

const AuthorityContext = React.createContext<AuthorityInstance>(null!);

export default AuthorityContext;
`;
}
