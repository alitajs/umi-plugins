<h1 align="center">umi-plugin-lodash</h1>

[![NPM version](https://img.shields.io/npm/v/@alitajs/umi-plugin-lodash?style=flat)](https://npmjs.org/package/@alitajs/umi-plugin-lodash)

> 按需打包Lodash

**推荐使用[umi-plugin-lodash](https://github.com/yutingzhao1991/umi-plugin-lodash)**

## 安装

```
// npm
npm install --dev @alitajs/umi-plugin-lodash

// yarn 
yarn add --dev @alitajs/umi-plugin-lodash
```

## 使用

* umi配置

```
// .umirc.ts || config/config.ts

// 开启按需打包
const config = {
  plugins: [
    ['@alitajs/umi-plugin-lodash']
  ]
};

// 使用CDN
const config = {
  plugins: [
    ['@alitajs/umi-plugin-lodash', {
      external: true,
      version: '4.0.0'
    }]
  ]
};

export default config;
```

* 在代码中如何使用

```
import { isString } form 'lodash';

if (isString('')) {
  // you code
}

```

## Options

### external

> 具体请看[externals](https://webpack.js.org/configuration/externals/#externals) 

* 类型: `boolean`
* 描述: 是否开启external
* 默认值: `false` 

### version

* 类型: `string`
* 描述: lodash的版本
* 默认值: 无
* example:

```
// version = 4.0.0
// 会在header添加链接
https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.0.0/lodash.min.js
```

### url

**优先级比version高**

* 类型: `string`
* 描述: lodash cdn 的链接
* 默认值: 无
