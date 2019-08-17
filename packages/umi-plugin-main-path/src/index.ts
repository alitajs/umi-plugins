import { IApi } from 'umi-types';
import { resetMainPath } from './utils/utils';

function noop() {
  return true;
}

export default function (api: IApi) {
  const { log, config } = api;
  log.success('reset main path plugin success!');

  api._registerConfig(() => {
    return () => {
      return {
        name: 'mainPath',
        validate: noop,
        onChange() {
          api.restart(`mainPath change`);
        },
      };
    };
  });

  console.log(config['mainPath']);

  if (config['mainPath']) {
    api.modifyRoutes((routes: any[]) => {
      return resetMainPath(routes, config['mainPath']);
    });
  }
}
