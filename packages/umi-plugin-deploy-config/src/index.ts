import { IApi } from 'umi-types';
import { IOptions } from './types';

export default function(
  api: IApi,
  options: IOptions
) {
  const { debug, config } = api;

  api.modifyDefaultConfig(config => {
    console.log(config);
    return {
      ...config,
      // 使用此插件默认开启runtimePublicPath
      runtimePublicPath: true,
    }
  });

  api.chainWebpackConfig(config => {
    debug('测试输出');
  });

}
