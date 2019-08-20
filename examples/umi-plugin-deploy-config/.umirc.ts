import { IConfig } from 'umi-types';

const config: IConfig = {
  base: '/test',
  hash: true,
  plugins: [
    ['umi-plugin-react', {
      // 开启按需加载
      dynamicImport: {
        level: 1
      }
    }],
    ['@alitajs/umi-plugin-deploy-config', {
      baseURL: 'https://api.***.com',
      exportConfig: false
    }]
  ]
};

export default config;
