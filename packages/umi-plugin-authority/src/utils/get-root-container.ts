export default function() {
  return `\
import React from 'react';
import AuthorityProvider from './authority-provider';

export function rootContainer(container: React.ReactNode, { routes }) {
  return React.createElement(AuthorityProvider, { routes }, container);
}
`;
}
