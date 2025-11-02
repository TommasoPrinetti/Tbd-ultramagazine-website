import "clsx";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/header.svelte_svelte_type_style_lang.js";
function Notfound($$renderer) {
  $$renderer.push(`<div class="notfound vertical_flex svelte-16a1yw5"><h1>404 - Page Not Found</h1> <p class="p2">The page you are looking for does not exist.</p> <a href="/" class="rounded_button"><p class="p2">Go to Home</p></a></div>`);
}
function _error($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    data?.issues || [];
    Notfound($$renderer2);
  });
}
export {
  _error as default
};
