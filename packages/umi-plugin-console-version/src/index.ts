import { IApi } from '@umijs/types';
import { getProjectName } from './utils';

export default function (api: IApi) {
  const pkgName = api.pkg?.name;
  const pkgVersion = api.pkg?.version;

  api.describe({
    key: 'consoleVersion',
    config: {
      default: {
        bindGlobal: false
      },
      schema(joi) {
        return joi.object({
          projectName: joi.string(),
          bindGlobal: joi.boolean(),
        });
      }
    }
  });

  if (!pkgName) return;

  const { projectName, bindGlobal } = api.userConfig.consoleVersion;

  const name = projectName || getProjectName(pkgName);

  if (name && pkgVersion) {
    api.addHTMLHeadScripts(() => {
      return bindGlobal
      ? [{ content: `window.${projectName} = "${pkgVersion}"; console.log("版本: ${pkgVersion}@${name}");` }]
      : [{ content: `console.log("版本: ${pkgVersion}@${name}");` }]
    })
  }
}
