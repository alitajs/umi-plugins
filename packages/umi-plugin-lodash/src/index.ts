import { dirname } from 'path';
import { IApi } from 'umi-types';
import { IOptions } from './types';

function importPlugin(key) {
  return [
    require.resolve('babel-plugin-import'),
    {
      libraryName: key,
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    key,
  ];
}

export default function(
  api: IApi,
  options: IOptions
) {
  api.chainWebpackConfig((memo) => {
    memo.resolve.alias.set('umi/lodash', dirname(
      require.resolve('lodash/package'),
    ));
    return memo;
  });

  api.modifyAFWebpackOpts(memo => {
    return {
      ...memo,
      babel: {
        ...(memo.babel || {}),
        plugins: [
          importPlugin('umi/lodash'),
          importPlugin('lodash'),
        ],
      },
    };
  });
}
