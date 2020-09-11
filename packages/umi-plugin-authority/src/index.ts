import { IApi } from 'umi';
import { join } from 'path';
import getContextContent from './utils/get-context';
import getProviderContent from './utils/get-provider';
import getContent from './utils/get-content';
import getRootContainerContent from './utils/get-root-container';
import { checkIfHasDefaultExporting } from './utils';

// plugin-authority 插件创建临时文件的文件夹名称
const AUTHORITY_DIR = 'plugin-authority';

export default function(api: IApi) {
  const tmpDir = api.paths.absTmpPath;
  const srcDir = api.paths.absSrcPath;
  const authorityFilePath = api.utils.winPath(join(srcDir!, 'authority'));

  api.onGenerateFiles(() => {
    // 判断 authority 工厂函数存在并且 default 暴露了一个函数
    if (checkIfHasDefaultExporting(authorityFilePath)) {
      // 创建 authority 的 context 以便跨组件传递 authority 实例
      api.writeTmpFile({
        path: `${AUTHORITY_DIR}/context.ts`,
        content: getContextContent(),
      });

      /**
       * 创建 AuthorityProvider
       * 1. 生成 authority 实例;
       * 2. 遍历修改 routes;
       * 3. 传给 context 的 Provider
       */
      api.writeTmpFile({
        path: `${AUTHORITY_DIR}/authority-provider.ts`,
        content: getProviderContent(api.utils),
      });

      // 创建 authority 的 hook
      api.writeTmpFile({
        path: `${AUTHORITY_DIR}/authority.tsx`,
        content: getContent(),
      });

      // 生成 rootContainer 运行时配置
      api.writeTmpFile({
        path: `${AUTHORITY_DIR}/root-container.ts`,
        content: getRootContainerContent(),
      });
    }
  });

  if (checkIfHasDefaultExporting(authorityFilePath)) {
    // 增加 rootContainer 运行时配置
    api.addRuntimePlugin(() =>
      api.utils.winPath(join(tmpDir!, AUTHORITY_DIR, 'root-container.ts')),
    );

    api.addUmiExports(() => [
      {
        exportAll: true,
        source: `../${AUTHORITY_DIR}/authority`,
      },
    ]);

    api.addTmpGenerateWatcherPaths(() => [
      `${authorityFilePath}.ts`,
      `${authorityFilePath}.js`,
    ]);
  }
}
