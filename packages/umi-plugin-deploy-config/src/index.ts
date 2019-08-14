import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { template } from 'lodash';
import { IApi } from 'umi-types';
import { getUmiCssScript, getUmiJsScript, replacePath } from './utils/utils';
import { IOptions } from './types';


export default function(
  api: IApi,
  {
    baseURL = '/'
  }: IOptions
) {
  const { paths, config } = api;

  api.modifyDefaultConfig(config => {
    return {
      ...config,
      publicPath: './',
      // 使用此插件默认开启runtimePublicPath
      runtimePublicPath: true,
    }
  });

  api.onBuildSuccessAsync(async () => {
    const data = readFileSync(join(__dirname, './templates/config.js.tpl'), 'utf-8');
    // 生成config.js

    const compiled = template(data.toString());
    const result = compiled({
      baseURL: baseURL,
      publicPath: config.publicPath
    });

    writeFileSync(join(paths.absOutputPath, 'config.js'), result);
  });

  api.modifyHTMLWithAST(($, { route, getChunkPath }) => {
    // 获取umi.js文件名称
    let umiJsPath = getChunkPath('umi.js');
    let umiCssPath = getChunkPath('umi.css');

    // 插入config.js
    $('head').append(`
      <script src="${config.base === '/' ? '' : config.base}/config.js?t=${new Date().getTime()}"></script>
    `);

    if (umiCssPath) {
      const links = $('head').find('link');

      if (links && links.length) {
        for (let i = 0; i < links.length; i++) {
          if (links[i].attribs['href'] === replacePath(umiCssPath, config.publicPath)) {
            // 删除已注入的umi.css
            $(links[i]).remove();
          }
        }

        // 添加umi.css的 Script
        $('head').append(getUmiCssScript(umiCssPath));
      }
    }

    if (umiJsPath) {
      const scripts = $('body').find('script');

      // 删除已注入umi.js
      if (scripts && scripts.length) {
        for (let i = 0; i < scripts.length; i++) {
          if (scripts[i].attribs['src'] === replacePath(umiJsPath, config.publicPath)) {
            $(scripts[i]).remove();
          }
        }

        // 添加umi.js的 Script
        $('body').append(getUmiJsScript(umiJsPath));
      }
    }
  });
}
