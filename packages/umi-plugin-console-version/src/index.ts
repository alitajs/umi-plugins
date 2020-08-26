import { IApi } from '@umijs/types';
import { getProjectName } from './utils';

export default function (api: IApi) {
  const pkgName = api.pkg?.name;
  const pkgVersion = api.pkg?.version;

  api.describe({
    key: 'projectName',
    config: {
      default: '',
      schema(joi) {
        return joi.string();
      }
    }
  });

  if (!pkgName) return;

  const name = api.userConfig.projectName || getProjectName(pkgName);

  if (name && pkgVersion) {
    api.addHTMLHeadScripts(() => {
      return [
        {
          content: `console.log("版本: ${pkgVersion}@${name}");`,
        }
      ]
    })
  }
}
