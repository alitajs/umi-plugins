import { dirname } from 'path';
import { IApi } from 'umi-types';
import { importPlugin } from './utils/utils';
import { IOptions } from './types';

export default function(
  api: IApi,
  options: IOptions
) {
  const newOptions = Object.assign({
    external: false,
    version: '',
    url: ''
  }, options);
  api.chainWebpackConfig((memo) => {
    memo.resolve.alias.set('umi/lodash', dirname(
      require.resolve('lodash/package'),
    ));
    if (newOptions.external) {
      const externals = memo.externals || {};
      memo.externals({
        ...externals,
        'umi/lodash': '_',
        'lodash': '_',
      });
    }
    return memo;
  });

  api.modifyAFWebpackOpts(memo => {
    if (newOptions.external) {
      return memo;
    }
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

  api.addHTMLHeadScript(() => {
    if (newOptions.external) {
      if (newOptions.url) {
        return {
          src: newOptions.url
        }
      }
      if (newOptions.version) {
        return {
          src: `https://cdnjs.cloudflare.com/ajax/libs/lodash.js/${newOptions.version}/lodash.min.js`,
        };
      } else {
        throw new Error('if you need external lodash, version is required!');
      }
    }
    return [];
  });
}
