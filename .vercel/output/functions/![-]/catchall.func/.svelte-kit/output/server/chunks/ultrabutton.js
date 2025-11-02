import { a0 as store_get, $ as attr_class, W as attr, X as stringify, a1 as unsubscribe_stores } from "./index2.js";
import { i as isUltraMode } from "./footer.js";
function Ultrabutton($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let shouldAnimate = false;
    let previousUltraMode = store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode);
    const TbdLogo = "/IDENTITY_IMAGES/tbd_LOGO.webp";
    if (store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode) !== previousUltraMode) {
      shouldAnimate = true;
      previousUltraMode = store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode);
      setTimeout(
        () => {
          shouldAnimate = false;
        },
        2200
      );
    }
    $$renderer2.push(`<div class="ultrabutton_container svelte-19m3lmi"><button${attr_class(`rounded_button ${stringify(store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode) ? "inactive" : "active")}`, "svelte-19m3lmi")}><p class="p2 svelte-19m3lmi" style="color: inherit">DEFAULT</p></button> <button${attr_class(`rounded_button ${stringify(store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode) ? "active" : "inactive")}`, "svelte-19m3lmi")}><p class="p2 svelte-19m3lmi" style="color: inherit">ULTRA</p></button></div> <div${attr_class("transition_block svelte-19m3lmi", void 0, { "animate": shouldAnimate })}><img${attr("src", TbdLogo)} alt="Logo of tbd" class="svelte-19m3lmi"/></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  Ultrabutton as U
};
