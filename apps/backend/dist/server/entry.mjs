import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C7d9oxmM.mjs';
import { manifest } from './manifest_zwZ063Ym.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/payment-methods.astro.mjs');
const _page2 = () => import('./pages/admin/products.astro.mjs');
const _page3 = () => import('./pages/admin/riders.astro.mjs');
const _page4 = () => import('./pages/carrito.astro.mjs');
const _page5 = () => import('./pages/client/client-products.astro.mjs');
const _page6 = () => import('./pages/login.astro.mjs');
const _page7 = () => import('./pages/signup.astro.mjs');
const _page8 = () => import('./pages/verify/_token_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["../../node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/admin/payment-methods.astro", _page1],
    ["src/pages/admin/products.astro", _page2],
    ["src/pages/admin/riders.astro", _page3],
    ["src/pages/carrito.astro", _page4],
    ["src/pages/client/client-products.astro", _page5],
    ["src/pages/login.astro", _page6],
    ["src/pages/signup.astro", _page7],
    ["src/pages/verify/[token].astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "middleware",
    "client": "file:///C:/Users/LENOVO%20THINKPAD%20T460/Desktop/delivery-fullstack/apps/frontend/dist/client/",
    "server": "file:///C:/Users/LENOVO%20THINKPAD%20T460/Desktop/delivery-fullstack/apps/frontend/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro",
    "experimentalStaticHeaders": false
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
