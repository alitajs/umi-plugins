import React from 'react';
import { isArray } from 'lodash';
import styles from './index.less';

export default function() {
  console.log(isArray([]));
  return (
    <div className={styles.normal}>
      <h1>Page Login</h1>
    </div>
  );
}
