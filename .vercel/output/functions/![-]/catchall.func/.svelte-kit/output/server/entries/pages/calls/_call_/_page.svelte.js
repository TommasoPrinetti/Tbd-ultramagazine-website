import { $ as attr_class, Y as escape_html, W as attr, X as stringify } from "../../../../chunks/index2.js";
import { H as Header, h as html, F as Footer } from "../../../../chunks/footer.js";
/* empty css                                                         */
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let call = data?.call || {};
    function formatDate(dateString, includeTime = false) {
      if (!dateString) return "";
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Europe/Rome"
      };
      if (includeTime) {
        options.hour = "2-digit";
        options.minute = "2-digit";
      }
      return date.toLocaleDateString("it-IT", options);
    }
    function getEuropeTimeString() {
      const now = /* @__PURE__ */ new Date();
      return now.toLocaleString("sv-SE", { timeZone: "Europe/Rome" });
    }
    function toEuropeTimeString(date) {
      return date.toLocaleString("sv-SE", { timeZone: "Europe/Rome" });
    }
    let callStatus = (() => {
      if (!call?.openDate || !call?.endDate) return "active";
      const nowStr = getEuropeTimeString();
      const open = new Date(call.openDate);
      const end = new Date(call.endDate);
      const openStr = toEuropeTimeString(open);
      const endStr = toEuropeTimeString(end);
      if (nowStr < openStr) {
        return "not-yet-open";
      } else if (nowStr >= openStr && nowStr <= endStr) {
        return "active";
      } else {
        return "closed";
      }
    })();
    ({
      manifestoTitle: call?.title || "",
      manifestoText: call?.description || "",
      downloadPath: call?.downloadPdfUrl || call?.hrefExternal || "",
      downloadText: call?.ctaText || "",
      fileDownloadButton: !!(call?.downloadPdfUrl || call?.hrefExternal)
    });
    $$renderer2.push(`<!---->`);
    {
      Header($$renderer2, { issuesData: data.issues, temporaryCalls: data.temporaryCalls });
      $$renderer2.push(`<!----> <div class="call_container vertical_flex svelte-uakwyz" id="MANIFESTO">`);
      if (call?.openDate || call?.endDate) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="call-dates svelte-uakwyz"><div${attr_class(`call-status-indicator status-${stringify(callStatus)}`, "svelte-uakwyz")}>`);
        if (callStatus === "not-yet-open") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="p2 status-text svelte-uakwyz">📅 Call opens on ${escape_html(formatDate(call.openDate))}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (callStatus === "active") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<p class="p2 status-text svelte-uakwyz">✅ Call is currently open</p>`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (callStatus === "closed") {
              $$renderer2.push("<!--[-->");
              $$renderer2.push(`<p class="p2 status-text svelte-uakwyz">❌ Call has closed</p>`);
            } else {
              $$renderer2.push("<!--[!-->");
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <h1>${html(call?.title)}</h1> <p class="p2">${html(call?.description)}</p> <a${attr("href", call?.hrefExternal)} class="rounded_button"><p class="p2">Download the call</p></a></div> `);
      Footer($$renderer2);
      $$renderer2.push(`<!---->`);
    }
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
