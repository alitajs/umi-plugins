const config = {
  plugins: [
    ['umi-plugin-react', {
      // 开启按需加载
      dynamicImport: {
        level: 1
      }
    }],
    ['@alitajs/umi-plugin-lodash', {
      external: true,
      version: '4.0.0'
    }]
  ]
};

export default config;
