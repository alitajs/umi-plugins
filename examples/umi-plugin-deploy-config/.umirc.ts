export default {
  hash: true,
  plugins: [
    ['umi-plugin-react', {
      // 开启按需加载
      dynamicImport: {
        level: 1
      }
    }],
    ['@alitajs/umi-plugin-deploy-config']
  ],
}
