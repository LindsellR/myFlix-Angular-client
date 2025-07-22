
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/myFlix-Angular-client',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/myFlix-Angular-client"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 28409, hash: '2b354cc2c3a56015c9d154f2ddd4a418b69e52b63c884d0df9d5feca45f8099b', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 21690, hash: '35935bbf6a7c28ea6d4369763a4bc42f6066cff163ffc316f3a2fa90116eeb56', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 28649, hash: 'f83a0ddf7b94d7d11ab76af7ef8bb3468e0970e742aca8559d4ec150c8425fbc', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-QQN3LIWR.css': {size: 7483, hash: '+Y8tWvlCP00', text: () => import('./assets-chunks/styles-QQN3LIWR_css.mjs').then(m => m.default)}
  },
};
