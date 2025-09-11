import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CUIAdwC-.mjs';
import 'kleur/colors';
import { a as $$Layout } from '../../chunks/Layout_BuTCp4k2.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$token = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "App" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="h-[calc(100vh-4rem)] flex flex-col gap-8 p-4 max-w-[90rem] mx-auto md:items-center justify-center"> <div class="border-1 p-4 rounded-md"> <p id="verify-text" class="text-center">Verificando el correo</p> </div> </main> ` })} ${renderScript($$result, "C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/verify/[token].astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/verify/[token].astro", void 0);

const $$file = "C:/Users/LENOVO THINKPAD T460/Desktop/delivery-fullstack/apps/frontend/src/pages/verify/[token].astro";
const $$url = "/verify/[token]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$token,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
