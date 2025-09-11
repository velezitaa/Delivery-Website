import 'kleur/colors';
import { q as decodeKey } from './chunks/astro/server_CUIAdwC-.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DGj9rCm6.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/LENOVO%20THINKPAD%20T460/Desktop/delivery-fullstack/apps/frontend/","cacheDir":"file:///C:/Users/LENOVO%20THINKPAD%20T460/Desktop/delivery-fullstack/apps/frontend/node_modules/.astro/","outDir":"file:///C:/Users/LENOVO%20THINKPAD%20T460/Desktop/delivery-fullstack/apps/frontend/dist/","srcDir":"file:///C:/Users/LENOVO%20THINKPAD%20T460/Desktop/delivery-fullstack/apps/frontend/src/","publicDir":"file:///C:/Users/LENOVO%20THINKPAD%20T460/Desktop/delivery-fullstack/apps/frontend/public/","buildClientDir":"file:///C:/Users/LENOVO%20THINKPAD%20T460/Desktop/delivery-fullstack/apps/frontend/dist/client/","buildServerDir":"file:///C:/Users/LENOVO%20THINKPAD%20T460/Desktop/delivery-fullstack/apps/frontend/dist/server/","adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/payment-methods/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/payment-methods","isIndex":false,"type":"page","pattern":"^\\/admin\\/payment-methods\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"payment-methods","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/payment-methods.astro","pathname":"/admin/payment-methods","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/products/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/products","isIndex":false,"type":"page","pattern":"^\\/admin\\/products\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/products.astro","pathname":"/admin/products","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/riders/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin/riders","isIndex":false,"type":"page","pattern":"^\\/admin\\/riders\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"riders","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/riders.astro","pathname":"/admin/riders","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"carrito/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/carrito","isIndex":false,"type":"page","pattern":"^\\/carrito\\/?$","segments":[[{"content":"carrito","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/carrito.astro","pathname":"/carrito","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"client/client-products/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/client/client-products","isIndex":false,"type":"page","pattern":"^\\/client\\/client-products\\/?$","segments":[[{"content":"client","dynamic":false,"spread":false}],[{"content":"client-products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/client/client-products.astro","pathname":"/client/client-products","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"signup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"../../node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/payment-methods.DDjVlpag.css"}],"routeData":{"route":"/verify/[token]","isIndex":false,"type":"page","pattern":"^\\/verify\\/([^/]+?)\\/?$","segments":[[{"content":"verify","dynamic":false,"spread":false}],[{"content":"token","dynamic":true,"spread":false}]],"params":["token"],"component":"src/pages/verify/[token].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/admin/payment-methods.astro",{"propagation":"none","containsHead":true}],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/admin/products.astro",{"propagation":"none","containsHead":true}],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/admin/riders.astro",{"propagation":"none","containsHead":true}],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/carrito.astro",{"propagation":"none","containsHead":true}],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/client/client-products.astro",{"propagation":"none","containsHead":true}],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/verify/[token].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/admin/payment-methods@_@astro":"pages/admin/payment-methods.astro.mjs","\u0000@astro-page:src/pages/admin/products@_@astro":"pages/admin/products.astro.mjs","\u0000@astro-page:src/pages/admin/riders@_@astro":"pages/admin/riders.astro.mjs","\u0000@astro-page:src/pages/carrito@_@astro":"pages/carrito.astro.mjs","\u0000@astro-page:src/pages/client/client-products@_@astro":"pages/client/client-products.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/verify/[token]@_@astro":"pages/verify/_token_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:../../node_modules/astro/dist/assets/endpoint/node@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BYlW_Tks.mjs","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DHXNKXS_.mjs","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/admin/payment-methods.astro?astro&type=script&index=0&lang.ts":"_astro/payment-methods.astro_astro_type_script_index_0_lang.gmKdsP9Q.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/admin/products.astro?astro&type=script&index=0&lang.ts":"_astro/products.astro_astro_type_script_index_0_lang.gmKdsP9Q.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/admin/riders.astro?astro&type=script&index=0&lang.ts":"_astro/riders.astro_astro_type_script_index_0_lang.gmKdsP9Q.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/signup.astro?astro&type=script&index=0&lang.ts":"_astro/signup.astro_astro_type_script_index_0_lang.BNvTosg1.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.rRYZZTHo.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/verify/[token].astro?astro&type=script&index=0&lang.ts":"_astro/_token_.astro_astro_type_script_index_0_lang.BE9KEXXN.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CQYA6zIP.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.D2-JIPRR.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/features/cart/components/CartList.astro?astro&type=script&index=0&lang.ts":"_astro/CartList.astro_astro_type_script_index_0_lang.DqGIaBfk.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/components/client/ClientProductsList.astro?astro&type=script&index=0&lang.ts":"_astro/ClientProductsList.astro_astro_type_script_index_0_lang.CJYDbmBI.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/components/riders/RidersList.astro?astro&type=script&index=0&lang.ts":"_astro/RidersList.astro_astro_type_script_index_0_lang.DdfuyiQl.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/components/riders/CreateRiderForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateRiderForm.astro_astro_type_script_index_0_lang.KkiJ7cAd.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/components/paymentMethods/PaymentMethodsList.astro?astro&type=script&index=0&lang.ts":"_astro/PaymentMethodsList.astro_astro_type_script_index_0_lang.CAIa3C1d.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/components/paymentMethods/CreatePaymentMethodForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreatePaymentMethodForm.astro_astro_type_script_index_0_lang.BecfEpBv.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/components/products/ProductsList.astro?astro&type=script&index=0&lang.ts":"_astro/ProductsList.astro_astro_type_script_index_0_lang.DYxJ7TgE.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/components/products/CreateProductForm.astro?astro&type=script&index=0&lang.ts":"_astro/CreateProductForm.astro_astro_type_script_index_0_lang.VHLpFbDB.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/components/client/ProductCard.astro?astro&type=script&index=0&lang.ts":"_astro/ProductCard.astro_astro_type_script_index_0_lang.DVmOHlV-.js","C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/features/search/components/SearchBarDesktop.astro?astro&type=script&index=0&lang.ts":"_astro/SearchBarDesktop.astro_astro_type_script_index_0_lang.Bc8X54Kv.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/admin/payment-methods.astro?astro&type=script&index=0&lang.ts","const o=document.querySelector(\"#abrir-modal\"),e=document.querySelector(\"#modal-fondo\");o&&e&&o.addEventListener(\"click\",()=>{e.classList.remove(\"hidden\")});"],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/admin/products.astro?astro&type=script&index=0&lang.ts","const o=document.querySelector(\"#abrir-modal\"),e=document.querySelector(\"#modal-fondo\");o&&e&&o.addEventListener(\"click\",()=>{e.classList.remove(\"hidden\")});"],["C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/admin/riders.astro?astro&type=script&index=0&lang.ts","const o=document.querySelector(\"#abrir-modal\"),e=document.querySelector(\"#modal-fondo\");o&&e&&o.addEventListener(\"click\",()=>{e.classList.remove(\"hidden\")});"]],"assets":["/_astro/logo.CgnVmbpZ.png","/_astro/payment-methods.DDjVlpag.css","/favicon.svg","/_astro/cart.module.DC5F8wrJ.js","/_astro/CartList.astro_astro_type_script_index_0_lang.DqGIaBfk.js","/_astro/ClientProductsList.astro_astro_type_script_index_0_lang.CJYDbmBI.js","/_astro/CreatePaymentMethodForm.astro_astro_type_script_index_0_lang.BecfEpBv.js","/_astro/CreateProductForm.astro_astro_type_script_index_0_lang.VHLpFbDB.js","/_astro/CreateRiderForm.astro_astro_type_script_index_0_lang.KkiJ7cAd.js","/_astro/endpoints.QH1VciTq.js","/_astro/index.astro_astro_type_script_index_0_lang.CQYA6zIP.js","/_astro/index.B9b1t7QR.js","/_astro/index.CViUNx8d.js","/_astro/Layout.astro_astro_type_script_index_0_lang.D2-JIPRR.js","/_astro/login.astro_astro_type_script_index_0_lang.rRYZZTHo.js","/_astro/notification.DyHDLNjw.js","/_astro/paymentMethods.module._KgkaXYD.js","/_astro/PaymentMethodsList.astro_astro_type_script_index_0_lang.CAIa3C1d.js","/_astro/ProductCard.astro_astro_type_script_index_0_lang.DVmOHlV-.js","/_astro/products.module.CQgbf1Qv.js","/_astro/ProductsList.astro_astro_type_script_index_0_lang.DYxJ7TgE.js","/_astro/riders.module.CyG87SC8.js","/_astro/RidersList.astro_astro_type_script_index_0_lang.DdfuyiQl.js","/_astro/SearchBarDesktop.astro_astro_type_script_index_0_lang.Bc8X54Kv.js","/_astro/signup.astro_astro_type_script_index_0_lang.BNvTosg1.js","/_astro/_token_.astro_astro_type_script_index_0_lang.BE9KEXXN.js","/admin/payment-methods/index.html","/admin/products/index.html","/admin/riders/index.html","/carrito/index.html","/client/client-products/index.html","/login/index.html","/signup/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"AzSbsw6dpvNIyy04UANcZx+Y87B7XRVxifpb3dtCITQ=","sessionConfig":{"driver":"fs-lite","options":{"base":"C:\\Users\\LENOVO THINKPAD T460\\Desktop\\delivery-fullstack\\apps\\frontend\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
