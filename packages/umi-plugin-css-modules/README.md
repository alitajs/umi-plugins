<h1 align="center">umi-plugin-css-modules</h1>

[![NPM version](https://img.shields.io/npm/v/@alitajs/umi-plugin-css-modules?style=flat)](https://npmjs.org/package/@alitajs/umi-plugin-css-modules)

> 使用后缀开启css modules

## 安装

```
// npm
npm install --dev @alitajs/umi-plugin-css-modules

// yarn 
yarn add --dev @alitajs/umi-plugin-css-modules
```

## 使用

* umi配置

```
// .umirc.ts || config/config.ts

const config = {
  plugins: [
    ['@alitajs/umi-plugin-css-modules']
  ]
};

export default config;
```

* 在代码中如何使用

```
// a.module.less
.a {
  background: #79f2aa;
}

// index.tsx
import React from 'react';
import styles from './a.module.less';

export default function() {
  return (
    <div>
      <h1 className={styles.a}>Page Home</h1>
    </div>
  );
}
```

## Options

### cssModule 

* 类型: `object`
* 描述: 修改匹配正则
* 默认值: `/\.module\.css$/` 

### lessModule

同上

### sassModule

同上
