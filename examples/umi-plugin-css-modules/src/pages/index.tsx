import React from 'react';
import styles from './a.less';
import styles1 from './a.module.less';
import './b.less';

export default function() {
  return (
    <div>
      <h1 className={styles.a}>Page Home</h1>
      <h1 className={styles1.a}>Page Home</h1>
      <h1 className="b">Page Home</h1>
    </div>
  );
}
