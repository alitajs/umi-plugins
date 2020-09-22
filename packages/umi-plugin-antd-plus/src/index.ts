import { dirname } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {

  api.modifyBabelPresetOpts(opts => {
    return {
      ...opts,
      import: (opts.import || []).concat([
        { libraryName: '@alitajs/antd-plus', libraryDirectory: 'es', style: true },
      ]),
    };
  });

  api.addDepInfo(() => {
    function getAntdDependency() {
      const { dependencies, devDependencies } = api.pkg;
      return (
        dependencies?.['@alitajs/antd-plus'] ||
        devDependencies?.['@alitajs/antd-plus'] ||
        require('../package').dependencies['@alitajs/antd-plus']
      );
    }

    return {
      name: '@alitajs/antd-plus',
      range: getAntdDependency(),
    };
  });

  api.addProjectFirstLibraries(() => [
    {
      name: '@alitajs/antd-plus',
      path: dirname(require.resolve('@alitajs/antd-plus/package.json')),
    }
  ]);
};
