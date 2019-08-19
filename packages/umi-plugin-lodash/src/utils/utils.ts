export function importPlugin(
  key: string
) {
  return [
    require.resolve('babel-plugin-import'),
    {
      libraryName: key,
      libraryDirectory: '',
      camel2DashComponentName: false,
    },
    key,
  ];
}
