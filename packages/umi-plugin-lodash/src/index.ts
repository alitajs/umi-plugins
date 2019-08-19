import { dirname } from 'path';
import { IApi } from 'umi-types';
import { importPlugin } from './utils/utils';
import { IOptions } from './types';

export default function(
  api: IApi,
  options: IOptions
) {
  api.chainWebpackConfig((memo) => {
    memo.resolve.alias.set('umi/lodash', dirname(
      require.resolve('lodash/package'),
    ));
    if (options.external) {
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
    if (options.external) {
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
    if (options.external) {
      if (options.cdnUrl) {
        return {
          src: options.cdnUrl
        }
      }
      if (options.version) {
        return {
          src: `https://cdnjs.cloudflare.com/ajax/libs/lodash.js/${options.version}/lodash.min.js`,
        };
      } else {
        throw new Error('if you need external lodash, version is required!');
      }
    }
    return [];
  });
}
