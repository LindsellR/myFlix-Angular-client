
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/myFlix-Angular-client/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/myFlix-Angular-client"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28410, hash: 'e5eba36773bd6e62cb07242c21dab7680f66a78e0183146e3e6fb3d604378ce9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 21691, hash: '031d22003e6694b21890c46f9b4c5a18f544d6b20cc86f93bfbd207adc687a72', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28650, hash: '056f3f2a3ea9e0404a6ffe7542c09bc81c662e3ddc68faf90973fef3e4df2238', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-QQN3LIWR.css': {size: 7483, hash: '+Y8tWvlCP00', text: () => import('./assets-chunks/styles-QQN3LIWR_css.mjs').then(m => m.default)}
  },
};
