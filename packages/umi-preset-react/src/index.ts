export default () => {
  return {
    plugins: [
      require.resolve('@alitajs/umi-plugin-authority'),
      require.resolve('@umijs/plugin-analytics'),
      require.resolve('@umijs/plugin-antd'),
      require.resolve('@umijs/plugin-crossorigin'),
      require.resolve('@umijs/plugin-initial-state'),
      require.resolve('@umijs/plugin-locale'),
      require.resolve('@umijs/plugin-layout'),
      require.resolve('@umijs/plugin-model'),
      require.resolve('@umijs/plugin-request'),
      require.resolve('@umijs/plugin-helmet'),
    ],
  };
};
