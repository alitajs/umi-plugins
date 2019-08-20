import React from 'react';
import { repeat } from 'lodash';
import styles from './index.less';

export default function() {
  return (
    <div className={styles.normal}>
      <h1>Page Login</h1>
      <p>{repeat('*', 3)}</p>
    </div>
  );
}
