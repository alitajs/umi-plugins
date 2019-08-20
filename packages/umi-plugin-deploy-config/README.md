<h1 align="center">umi-plugin-deploy-config</h1>

[![NPM version](https://img.shields.io/npm/v/@alitajs/umi-plugin-deploy-config.svg?style=flat)](https://npmjs.org/package/@alitajs/antd-plus)

插件作用提取项目部署的配置到输出目录的根目录

> 场景: 在实际开发中，项目会有不同的环境，如此能够做到一次编译，在各个环境下都可以运行呢？

**注意:本插件主要针对UMI项目CDN流程**

* umi 中请勿设置`publicPath`、`runtimePublicPath`
* 如要结合CI流程 请配和[update-deploy-config](https://github.com/ts-react/update-deploy-config)使用

## 安装

```
// npm
npm install --dev @alitajs/umi-plugin-deploy-config

// yarn 
yarn add --dev @alitajs/umi-plugin-deploy-config
```

## 使用

```
// .umirc.ts || config/config.ts
import { IConfig } from 'umi-types';

const config: IConfig = {
  plugins: [
    ['@alitajs/umi-plugin-deploy-config', {
      baseURL: 'https://api.***.com'
    }]
  ]
};

export default config;
```

## Options

### baseURL

* 类型: `string`
* 描述: API地址
* 默认值: 无

### exportConfig

* 类型: `boolean`
* 描述: 是否导出config.js
* 默认值: true

## 输出结果

* 输出配置文件如下

```
// config.js
(function() {
  // API地址
  window.baseURL = 'https://api.***.com';
  // 共有路径
  window.publicPath = "https://cdn.***.com/${project-name}/${env}/";
})();
```

* 输出Html文件如下

```
// 核心代码
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="/{base}/config.js?t=1565598003"></script>
    <script>
      var bundleStyle = document.createElement('link');
      bundleStyle.rel = 'stylesheet';
      bundleStyle.href = window.publicPath + 'umi.daee5917.css';
      document.head.appendChild(bundleStyle);
    </script>
  </head>
  <body>
    <noscript>Sorry, we need js to run correctly!</noscript>
    <div id="root"></div>
    <script>
      var bundleScript = document.createElement('script');
      bundleScript.type = 'text/javascript';
      bundleScript.src = window.publicPath + 'umi.3abab410.js';
      document.body.appendChild(bundleScript);
    </script>
  </body>
</html>

```
