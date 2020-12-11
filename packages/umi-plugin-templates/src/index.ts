import { utils, IApi } from 'umi';
import { clearGitCache, addBlock } from '@alitajs/block-sdk';

const { signale, chalk } = utils;

export default (api: IApi) => {

  const blockDefaultConfig = {
    closeFastGithub: true,
    blockPagesPath: 'pages',
    defaultGitUrl: 'https://github.com/alitajs/templates'
  }
  api.describe({
    key: 'block',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });
  api.modifyDefaultConfig((memo) => {
    return {
      ...memo,
      block: {
        ...blockDefaultConfig,
        ...memo?.block || {}
      },
    };
  });
  async function template(args: any = {}, opts = {}) {
    let retCtx;
    const defaultConfig = {
      skipModifyRoutes: false,
      page: true,
    };
    switch (args._[0]) {
      case 'clear':
        await clearGitCache({ dryRun: args.dryRun });
        break;
      case 'add':
        retCtx = await addBlock({ ...args, url: args._[1], ...defaultConfig }, opts, api);
        // TODO: 这里可能要做一些后续的收尾工作，因为 templates 和 block 的设计存在一些细节差异。到这里完成了将 pages 文件拷贝到对应的路由中去
        break;
      // templates 中不需要 list
      // case 'list':
      //   retCtx = await getDefaulttemplateList(args, templateConfig, api);
      //   break;
      default:
        throw new Error(
          `Please run ${chalk.cyan.underline('alita help template')} to checkout the usage`,
        );
    }
    return retCtx; // return for test
  }

  const details = `

Commands:

  ${chalk.cyan(`add `)}     add a template to your project
  ${chalk.cyan(`clear`)}    clear all git cache


Options for the ${chalk.cyan(`add`)} command:

  ${chalk.green(`--path              `)} the file path, default the name in package.json
  ${chalk.green(`--route-path        `)} the route path, default the name in package.json
  ${chalk.green(`--branch            `)} git branch
  ${chalk.green(`--npm-client        `)} the npm client, default npm or yarn (if has yarn.lock)
  ${chalk.green(`--skip-dependencies `)} don't install dependencies
  ${chalk.green(`--skip-modify-routes`)} don't modify the routes
  ${chalk.green(`--dry-run           `)} for test, don't install dependencies and download
  ${chalk.green(`--page              `)} add the template to a independent directory as a page
  ${chalk.green(`--layout            `)} add as a layout template (add route with empty children)
  ${chalk.green(`--js                `)} If the template is typescript, convert to js
  ${chalk.green(`--registry          `)} set up npm installation using the registry
  ${chalk.green(`--closeFastGithub   `)} If using custom template repository, please set it to true

Examples:

  ${chalk.gray(`# Add template`)}
  alita template add demo
  alita template add ant-design-pro/Monitor

  ${chalk.gray(`# Add template with full url`)}
  alita template add https://github.com/alitajs/alita-templates/tree/master/templates/demo

  ${chalk.gray(`# Add template with specified route path`)}
  alita template add demo --path /foo/bar

  `.trim();

  api.registerCommand({
    name: 'template',
    alias: 'tpl',
    async fn({ args }) {
      if (!args._[0]) {
        // TODO: use plugin register args
        console.log(
          details
            .split('\n')
            .map(line => `  ${line}`)
            .join('\n'),
        );
        return;
      }
      // return only for test
      try {
        await template(args);
      } catch (e) {
        signale.error(e);
      }
    },
  });
};
