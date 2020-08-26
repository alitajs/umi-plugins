import { camelCase } from 'lodash';

/**
 * 获取处理后的项目名称
 * @param pkgName
 */
export function getProjectName(pkgName: string) {
  // strip none @umijs scope
  if (pkgName.charAt(0) === '@') {
    pkgName = pkgName.split('/')[1];
  }
  return nameToKey(pkgName);
}

function nameToKey(name: string) {
  return name
    .split('.')
    .map((part) => camelCase(part))
    .join('.');
}
