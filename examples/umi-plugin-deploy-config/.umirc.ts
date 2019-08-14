import { IConfig } from 'umi-types';

const config: IConfig = {
  hash: true,
  base: '/console',
  plugins: [
    ['umi-plugin-react', {
      // 开启按需加载
      dynamicImport: {
        level: 1
      }
    }],
    ['@alitajs/umi-plugin-deploy-config', {
      baseURL: 'https://api.***.com'
    }]
  ]
};

export default config;
