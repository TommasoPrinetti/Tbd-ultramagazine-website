import "clsx";
import { $ as attr_class, W as attr, a4 as attr_style, X as stringify, a0 as store_get, Y as escape_html, a1 as unsubscribe_stores, a5 as bind_props } from "./index2.js";
import { a as headerHeight } from "./footer.js";
function Buy_buttons($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<button class="rounded_button" id="BUY_ACTIVE"><p class="p2">BUY NOW</p></button>`);
  });
}
function Buying_slider($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { issueData, isSliderOpen = false } = $$props;
    const spedTracciata = 7;
    let globalCost = (issueData?.issuePrice || 0) + spedTracciata;
    if (issueData?.issuePrice) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`buying_slider vertical_flex ${stringify(isSliderOpen ? "open" : "")}`, "svelte-2j7la9")}${attr("id", issueData?.issueTitle)}${attr_style(`margin-top: ${stringify(store_get($$store_subs ??= {}, "$headerHeight", headerHeight))}px;`)}><!---->`);
      {
        $$renderer2.push(`<button class="exit_slider svelte-2j7la9" aria-label="Close slider" aria-roledescription="Close slider" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none"><path d="M2 1.5L25 24.5" stroke-width="3" stroke-linecap="round"></path><path d="M25 1.5L2 24.5" stroke-width="3" stroke-linecap="round"></path></svg></button>`);
      }
      $$renderer2.push(`<!----> <img${attr("src", issueData?.issueCover)}${attr("alt", issueData?.issueTitle)} class="svelte-2j7la9"/> <div class="paypal_button"${attr("id", issueData?.issueTitle)}><div id="smart-button-container" class="paypal_button_container"><div style="text-align: center;"><div class="Title_drop_container svelte-2j7la9"><p class="p1">PRE ORDER ISSUE ${escape_html(issueData?.issueTitle)}</p> <select id="item-options">`);
      $$renderer2.option(
        {
          value: `${stringify(issueData?.issueTitle)} - SPED. GRATUITA`,
          price: issueData?.issuePrice
        },
        ($$renderer3) => {
          $$renderer3.push(`SPED. GRATUITA - ${escape_html(issueData?.issuePrice)} EUR`);
        }
      );
      $$renderer2.option(
        {
          value: `${stringify(issueData?.issueTitle)} - SPED. ESPRESSA (TRACCIATA)`,
          price: globalCost
        },
        ($$renderer3) => {
          $$renderer3.push(`SPED. ESPRESSA (TRACCIATA) - ${escape_html(globalCost)} EUR`);
        }
      );
      $$renderer2.push(`</select> <select style="visibility: hidden" id="quantitySelect"></select></div> <div id="paypal-button-container"></div></div> <div style="height: var(--spacing-xl);"></div> <div style="height: var(--spacing-xl);"></div></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { isSliderOpen });
  });
}
export {
  Buy_buttons as B,
  Buying_slider as a
};
