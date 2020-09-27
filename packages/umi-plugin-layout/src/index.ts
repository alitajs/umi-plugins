import { IApi, utils } from 'umi';
import { dirname } from 'path';

export default (api: IApi) => {
  api.describe({
    key: 'layout',
    config: {
      schema(joi) {
        return joi.object();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    enableBy: api.EnableBy.config,
  });

  api.addDepInfo(() => {
    const pkg = require('../package.json');
    function getLayoutDependency() {
      const { dependencies, devDependencies } = api.pkg;
      return (
        dependencies?.['@ant-design/pro-layout'] ||
        devDependencies?.['@ant-design/pro-layout'] ||
        require('../package').dependencies['@ant-design/pro-layout']
      );
    }
    return [
      {
        name: '@umijs/route-utils',
        range: pkg.dependencies['@umijs/route-utils'],
      },
      {
        name: '@ant-design/icons',
        range: pkg.peerDependencies['@ant-design/icons'],
      },
      {
        name: '@ant-design/pro-layout',
        range: getLayoutDependency()
      }
    ];
  });

  /**
   * 优先使用项目安装的依赖
   */
  api.addProjectFirstLibraries(() => [
    {
      name: '@ant-design/pro-layout',
      path: dirname(require.resolve('@ant-design/pro-layout/package.json')),
    }
  ]);

}
