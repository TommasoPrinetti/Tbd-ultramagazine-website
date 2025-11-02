import { W as attr, a0 as store_get, Y as escape_html, Z as ensure_array_like, a1 as unsubscribe_stores } from "./index2.js";
import "@sveltejs/kit/internal";
import "./exports.js";
import "./utils.js";
import "@sveltejs/kit/internal/server";
import "./header.svelte_svelte_type_style_lang.js";
import { w as writable } from "./index.js";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
let isUltraMode = writable(false);
let isMenuOpen = writable(false);
let headerHeight = writable(0);
function header_buttons_container($$renderer, type) {
  if (type === "COMMON") {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<a class="rounded_button svelte-11vwewz" href="#LATEST"><p class="p2 svelte-11vwewz">LATEST</p></a> <a class="rounded_button svelte-11vwewz" href="#ISSUES"><p class="p2 svelte-11vwewz">ISSUES</p></a> <a class="rounded_button svelte-11vwewz" href="#ABOUT"><p class="p2 svelte-11vwewz">ABOUT</p></a>`);
  } else {
    $$renderer.push("<!--[!-->");
    if (type === "ARTICLES" || type === "ISSUES") {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<a class="rounded_button svelte-11vwewz" href="#ISSUE"><p class="p2 svelte-11vwewz">ISSUE</p></a> <a class="rounded_button svelte-11vwewz" href="#ABSTRACT"><p class="p2 svelte-11vwewz">ABSTRACT</p></a> <a class="rounded_button svelte-11vwewz" href="#ARTICLES"><p class="p2 svelte-11vwewz">ARTICLES</p></a>`);
    } else {
      $$renderer.push("<!--[!-->");
      if (type === "ABOUT") {
        $$renderer.push("<!--[-->");
      } else {
        $$renderer.push("<!--[!-->");
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]-->`);
}
function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const TbdLogo = "/IDENTITY_IMAGES/tbd_LOGO.webp";
    let { headerVar = "COMMON", issuesData, temporaryCalls } = $$props;
    const latestIssue = issuesData?.find((issue) => issue.isLatestIssue === true);
    let repeatText = ` © TBD ULTRAMAGAZINE - ${temporaryCalls[0]?.title} - `.repeat(100);
    $$renderer2.push(`<header${attr("id", headerVar)} class="vertical_flex svelte-11vwewz"><a class="header_top svelte-11vwewz" href="https://www.liste.ch/en/home.html" target="_blank" rel="noopener noreferrer"><div class="banner svelte-11vwewz"><p class="p3 svelte-11vwewz">${html(repeatText)}</p></div></a> <div class="header_lower svelte-11vwewz"><div class="header_buttons_container svelte-11vwewz">`);
    header_buttons_container($$renderer2, headerVar);
    $$renderer2.push(`<!----></div> <a data-sveltekit-preload="" class="header_logo svelte-11vwewz"><img${attr("src", TbdLogo)} alt="TBDLogoImage" class="svelte-11vwewz"/></a> <button class="burger_container svelte-11vwewz" aria-label="Toggle Menu" aria-roledescription="Toggle Menu" tabindex="0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="svelte-11vwewz"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" class="svelte-11vwewz"></path></svg></button></div> `);
    if (store_get($$store_subs ??= {}, "$isMenuOpen", isMenuOpen)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="slide_in_major vertical_flex svelte-11vwewz"><div class="slide_in_container svelte-11vwewz">`);
      if (latestIssue) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="last_issue_container vertical_flex svelte-11vwewz"><h3 class="svelte-11vwewz">${escape_html(latestIssue?.issueTitle)}</h3> <img${attr("src", latestIssue.issueCover)} alt="Latest Issue" class="svelte-11vwewz"/> <a class="rounded_button svelte-11vwewz"><p class="p2 svelte-11vwewz">IS OUT NOW!</p></a></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="titles_container vertical_flex svelte-11vwewz"><a href="#ISSUES" class="svelte-11vwewz"><p class="p1 svelte-11vwewz" style="text-decoration: underline;">ISSUES</p></a> <!--[-->`);
      const each_array = ensure_array_like(issuesData || []);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let issue = each_array[$$index];
        if (issue.issueCategory === "issues") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<a data-sveltekit-preload="" class="link svelte-11vwewz"><p class="p1 svelte-11vwewz" style="padding-bottom: 0px; font-weight: 400;">→ ${escape_html(issue.issueTitle)}</p></a>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="titles_container vertical_flex svelte-11vwewz"><a href="#PUBLICATIONS" class="svelte-11vwewz"><p class="p1 svelte-11vwewz" style="text-decoration: underline;">PUBLICATIONS</p></a> <!--[-->`);
      const each_array_1 = ensure_array_like(issuesData || []);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let publication = each_array_1[$$index_1];
        if (publication.issueCategory === "publications") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<a data-sveltekit-preload="" class="link svelte-11vwewz"><p class="p1 svelte-11vwewz" style="padding-bottom: 0px; font-weight: 400;">→ ${escape_html(publication.issueTitle)}</p></a>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="titles_container vertical_flex svelte-11vwewz"><a href="#SPECIAL_PROJECTS" class="svelte-11vwewz"><p class="p1 svelte-11vwewz" style="text-decoration: underline;">SPECIAL PROJECTS</p></a> <!--[-->`);
      const each_array_2 = ensure_array_like(issuesData);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let specialProject = each_array_2[$$index_2];
        if (specialProject.issueCategory === "special projects") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<a data-sveltekit-preload="" class="link svelte-11vwewz"><p class="p1 svelte-11vwewz" style="padding-bottom: 0px; font-weight: 400;">→ ${escape_html(specialProject.issueTitle)}</p></a>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> <div class="about_container vertical_flex svelte-11vwewz"><a class="svelte-11vwewz"><h3 class="svelte-11vwewz">ABOUT</h3></a></div> <div class="instagram_container vertical_flex svelte-11vwewz"><a target="_blank" rel="noopener noreferrer" class="svelte-11vwewz"><h3 class="svelte-11vwewz">INSTAGRAM</h3></a></div></div> <div class="slide_footer vertical_flex svelte-11vwewz"><div class="footer_text_container svelte-11vwewz"><p class="p1 svelte-11vwewz">© TBD ULTRA MAGAZINE 2024</p> <a href="mailto:info@tbdultramagazine.com" class="svelte-11vwewz"><p class="p3 svelte-11vwewz">info@tbdultramagazine.com</p></a></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></header>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const footerImg = "/IDENTITY_IMAGES/FOOTERTEXT.svg";
    const mailchimpActionUrl = "https://polimi.us21.list-manage.com/subscribe/post?u=2088942308759df62fadb3c02&id=8b4532ecd0&f_id=00b7ece6f0";
    $$renderer2.push(`<footer class="svelte-1jfonih"><div class="footer_high svelte-1jfonih"><img${attr("src", footerImg)} alt="Footer Text" class="svelte-1jfonih"/></div> <section class="svelte-1jfonih"><div class="footer_button_container svelte-1jfonih"><a class="button" href="https://www.instagram.com/tbd.ultramagazine/"><p class="p2">INSTAGRAM</p></a> <a class="button" href="https://www.facebook.com/TBDultramagazine/"><p class="p2">FACEBOOK</p></a></div> <div class="newsletter_container svelte-1jfonih"><div id="mc_embed_signup" class="svelte-1jfonih"><form${attr("action", mailchimpActionUrl)} method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate svelte-1jfonih" target="_blank"><div id="mc_embed_signup_scroll" class="svelte-1jfonih"><h3>Subscribe to the newsletter</h3> <div class="mc-field-group svelte-1jfonih"><input type="email" name="EMAIL" class="required email svelte-1jfonih" id="mce-EMAIL"${attr("required", true, true)} placeholder="Your Email address here"/></div> <div id="mce-responses" class="clear"><div class="response" id="mce-error-response" style="display:none;"></div> <div class="response" id="mce-success-response" style="display:none;"></div></div> <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_2088942308759df62fadb3c02_8b4532ecd0" tabindex="-1" value=""/></div> <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button" style="color: var(--white-blue);"/></div></div></form></div></div></section></footer>`);
  });
}
export {
  Footer as F,
  Header as H,
  headerHeight as a,
  html as h,
  isUltraMode as i
};
