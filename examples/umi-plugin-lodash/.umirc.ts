const config = {
  plugins: [
    ['umi-plugin-react', {
      // 开启按需加载
      dynamicImport: {
        level: 3
      }
    }],
    ['@alitajs/umi-plugin-lodash', {
      external: true,
      version: '4.17.10'
    }]
  ]
};

export default config;
