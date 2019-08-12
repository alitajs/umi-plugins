<h1 align="center">umi-plugin-deploy-config</h1>

插件作用提取项目部署的配置到输出目录的根目录

> 场景: 在实际开发中，项目会有不同的环境，如此能够做到一次编译，在各个环境下都可以运行呢？

## 安装

```
// npm
npm install --dev @alitajs/umi-plugin-deploy-config

// yarn 
yarn add @alitajs/umi-plugin-deploy-config
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

## 输出结果

* 输出配置文件如下

```
// config.js
(function() {
  // API地址
  window.baseURL = 'https://api.***.com';
  // 路由基本路径
  window.routerBase = "/";
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
    <script src="./config.js?t=1565598003"></script>
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
