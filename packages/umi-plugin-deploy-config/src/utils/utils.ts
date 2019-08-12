export function replacePath(
  path: string,
  replaceValue: string
) {
  return path.replace('__PATH_TO_PUBLIC_PATH__', replaceValue)
}

// 组织 Umi Script内容
export function getUmiCssScript(
  sourcePath: string
) {
  return `
   <script>
     var bundleStyle = document.createElement('link');
     bundleStyle.rel = 'stylesheet';
     bundleStyle.href = window.publicPath + '${replacePath(sourcePath, '')}';
     document.head.appendChild(bundleStyle);
   </script>
  `
}

// 组织 Umi Script内容
export function getUmiJsScript(
  sourcePath: string
) {
  return `
   <script>
     var bundleScript = document.createElement('script');
     bundleScript.type = 'text/javascript';
     bundleScript.src = window.publicPath + '${replacePath(sourcePath, '')}';
     document.body.appendChild(bundleScript);
   </script>
  `
}
