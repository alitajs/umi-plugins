
export default {
  routes: [
    { path: '/', component: 'index', authority: 'module1/action1' },
  ],
  plugins: [
    require.resolve('../../'),
    require.resolve('@umijs/plugin-initial-state'),
    require.resolve('@umijs/plugin-model'),
  ]
}
