import React from 'react';
import { camelCase } from 'lodash';
import styles from './index.less';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page Home</h1>
      <p>{camelCase('Foo Bar')}</p>
    </div>
  );
}
