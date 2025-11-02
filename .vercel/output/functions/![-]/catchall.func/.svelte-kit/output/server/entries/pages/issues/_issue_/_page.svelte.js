import { Y as escape_html, W as attr, a0 as store_get, a1 as unsubscribe_stores, Z as ensure_array_like, $ as attr_class, _ as head, a2 as await_block, a3 as spread_props } from "../../../../chunks/index2.js";
import { h as html, i as isUltraMode, H as Header, F as Footer } from "../../../../chunks/footer.js";
import { B as Buy_buttons, a as Buying_slider } from "../../../../chunks/buying_slider.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/header.svelte_svelte_type_style_lang.js";
import { U as Ultrabutton } from "../../../../chunks/ultrabutton.js";
/* empty css                                                         */
function Manifesto($$renderer, $$props) {
  let {
    manifestoTitle,
    manifestoText,
    downloadPath,
    downloadText,
    fileDownloadButton
  } = $$props;
  $$renderer.push(`<div class="manifesto base_grid svelte-g5vjom" id="ABSTRACT"><h2>${escape_html(manifestoTitle)}</h2> <p class="p2 svelte-g5vjom">${html(manifestoText)}</p> `);
  if (fileDownloadButton === true) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<a class="button"${attr("href", downloadPath)}${attr("download", manifestoTitle)}><p class="p3">${escape_html(downloadText)}</p></a>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
function Cow_element($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { issueData } = $$props;
    $$renderer2.push(`<div id="ABSTRACT" class="base_grid cow_element svelte-cuk4ki"><div class="cow_text svelte-cuk4ki"><p class="p2">`);
    if (store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`${html(issueData?.UltraCowElementText)}`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`${html(issueData?.CowElementText)}`);
    }
    $$renderer2.push(`<!--]--></p></div> <div class="cow_img svelte-cuk4ki">`);
    if (store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<img style="width: 100%;"${attr("src", issueData?.UltraCowElementImg)} alt="" class="svelte-cuk4ki"/> <p class="d1">${html(issueData?.UltraCowImgDidascalia)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<img style="width: 100%;"${attr("src", issueData?.CowElementImg)} alt="" class="svelte-cuk4ki"/> <p class="d1">${html(issueData?.CowImgDidascalia)}</p>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Issue_hero($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { issueData } = $$props;
    let isSliderOpen = false;
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      $$renderer3.push(`<div id="ISSUE" class="base_grid hero_section svelte-1svbtcy"><div class="hero_text vertical_flex svelte-1svbtcy"><h1>`);
      if (store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode)) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`${html(issueData?.UltraissueTitle)}`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`${html(issueData?.issueTitle)}`);
      }
      $$renderer3.push(`<!--]--></h1> <p class="p2 svelte-1svbtcy">`);
      if (store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode)) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`${html(issueData?.UltraissueHeroText)}`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`${html(issueData?.issueHeroText)}`);
      }
      $$renderer3.push(`<!--]--></p> `);
      if (issueData?.issuePrice && !store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode)) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="buybuttons"><!--[-->`);
        const each_array = ensure_array_like([1, 2, 3]);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          each_array[$$index];
          Buy_buttons($$renderer3);
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--></div> <div class="hero_img svelte-1svbtcy">`);
      if (store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode)) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<img${attr("src", issueData?.UltraissueThumbnail)}${attr("alt", issueData?.issueNumber)}/>`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<img${attr("src", issueData?.issueThumbnail)}${attr("alt", issueData?.issueNumber)}/>`);
      }
      $$renderer3.push(`<!--]--></div></div> `);
      Buying_slider($$renderer3, {
        issueData,
        get isSliderOpen() {
          return isSliderOpen;
        },
        set isSliderOpen($$value) {
          isSliderOpen = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Mag_gallery($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { images = [] } = $$props;
    let currentImageIndex = 0;
    if (images) {
      $$renderer2.push("<!--[-->");
      if (images.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="gallery svelte-1x0yvyc"><h2 class="svelte-1x0yvyc">CLICK ME</h2> <section class="svelte-1x0yvyc"><!--[-->`);
        const each_array = ensure_array_like(images);
        for (let index = 0, $$length = each_array.length; index < $$length; index++) {
          let image = each_array[index];
          $$renderer2.push(`<button${attr("id", `image${index + 1}`)}${attr_class("svelte-1x0yvyc", void 0, { "current": currentImageIndex === index })}><img${attr("src", image)}${attr("alt", `GALLERY_${index + 1}`)} class="svelte-1x0yvyc"/></button>`);
        }
        $$renderer2.push(`<!--]--></section></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
function Issue_article($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { articleData } = $$props;
    $$renderer2.push(`<article class="base_grid svelte-74j634"><div${attr_class("article_img_container svelte-74j634", void 0, {
      "overlay": store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode)
    })}><img${attr("src", articleData.thumbnail.asset.url)} alt="AltText" class="svelte-74j634"/></div> <div class="vertical_flex article_text_container svelte-74j634"><h2 class="svelte-74j634">${html(articleData.title)}</h2> <p class="p3 svelte-74j634">${html(articleData.description)}</p></div></article>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    let issue = data?.issue;
    let issues = data?.issues || [];
    data?.temporaryCalls || [];
    let sectionNames = issue?.articles && Array.isArray(issue.articles) ? [
      ...new Set(issue.articles.map((article) => article.section).filter(Boolean))
    ] : [];
    head("1tond3t", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(issue?.issueTitle)}</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", issue?.issueHeroText)}/> <meta property="og:site_name" content="TBD ULTRAMAGAZINE"/> <meta property="og:locale" content="it"/> <meta property="og:type" content="issue"/> <meta property="og:title"${attr("content", issue?.issueTitle)}/> <meta property="og:description"${attr("content", issue?.issueHeroText)}/> <meta property="og:image"${attr("content", issue?.issueThumbnail)}/> <meta property="og:image:alt"${attr("content", issue?.issueTitle)}/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="627"/>`);
    });
    Header($$renderer2, {
      issuesData: issues,
      temporaryCalls: data.temporaryCalls,
      headerVar: "ISSUES"
    });
    $$renderer2.push(`<!----> <!---->`);
    {
      Issue_hero($$renderer2, { issueData: issue });
      $$renderer2.push(`<!----> `);
      await_block(
        $$renderer2,
        issue?.galleryImages,
        () => {
          $$renderer2.push(`<p>Loading gallery images...</p>`);
        },
        (galleryImages) => {
          if (issue?.layoutOption === "Classic") {
            $$renderer2.push("<!--[-->");
            if (store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode)) {
              $$renderer2.push("<!--[-->");
              Mag_gallery($$renderer2, { images: issue.UltraGalleryImages });
            } else {
              $$renderer2.push("<!--[!-->");
              Mag_gallery($$renderer2, { images: galleryImages });
            }
            $$renderer2.push(`<!--]-->`);
          } else {
            $$renderer2.push("<!--[!-->");
            if (issue?.layoutOption === "Manifesto") {
              $$renderer2.push("<!--[-->");
              if (issue?.manifestoTitle) {
                $$renderer2.push("<!--[-->");
                Manifesto($$renderer2, spread_props([issue, { id: "ABSTRACT" }]));
              } else {
                $$renderer2.push("<!--[!-->");
              }
              $$renderer2.push(`<!--]-->`);
            } else {
              $$renderer2.push("<!--[!-->");
              if (issue?.layoutOption === "Ibrido") {
                $$renderer2.push("<!--[-->");
                if (store_get($$store_subs ??= {}, "$isUltraMode", isUltraMode)) {
                  $$renderer2.push("<!--[-->");
                  Mag_gallery($$renderer2, { images: issue.UltraGalleryImages });
                } else {
                  $$renderer2.push("<!--[!-->");
                  Mag_gallery($$renderer2, { images: issue.galleryImages });
                }
                $$renderer2.push(`<!--]--> `);
                if (issue?.manifestoTitle) {
                  $$renderer2.push("<!--[-->");
                  Manifesto($$renderer2, spread_props([issue, { id: "ABSTRACT" }]));
                } else {
                  $$renderer2.push("<!--[!-->");
                }
                $$renderer2.push(`<!--]--> `);
                if (issue?.CowElementText) {
                  $$renderer2.push("<!--[-->");
                  Cow_element($$renderer2, { issueData: issue });
                } else {
                  $$renderer2.push("<!--[!-->");
                }
                $$renderer2.push(`<!--]-->`);
              } else {
                $$renderer2.push("<!--[!-->");
              }
              $$renderer2.push(`<!--]-->`);
            }
            $$renderer2.push(`<!--]-->`);
          }
          $$renderer2.push(`<!--]-->`);
        }
      );
      $$renderer2.push(`<!--]--> `);
      if (issue?.issueTitle === "ISSUE 3") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="video_gallery svelte-1tond3t"><div class="single_video svelte-1tond3t" id="video_#1"><div style="padding:100% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/637629288?h=66b3ae91f8" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="svelte-1tond3t"></iframe></div> <script src="https://player.vimeo.com/api/player.js"><\/script></div> <div class="single_video svelte-1tond3t" id="video_#2"><div style="padding:100% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/637612946?h=13fe136ba9" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="svelte-1tond3t"></iframe></div> <script src="https://player.vimeo.com/api/player.js"><\/script></div> <div class="single_video svelte-1tond3t" id="video_#3"><div style="padding:100% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/637618840?h=94b5d22c38" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="svelte-1tond3t"></iframe></div> <script src="https://player.vimeo.com/api/player.js"><\/script></div> <div class="single_video svelte-1tond3t" id="video_#4"><div style="padding:100% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/637623042?h=365c31a28b" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="svelte-1tond3t"></iframe></div> <script src="https://player.vimeo.com/api/player.js"><\/script></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="article_list_container svelte-1tond3t" id="ARTICLES"><!--[-->`);
      const each_array = ensure_array_like(sectionNames);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let sectionName = each_array[$$index_1];
        $$renderer2.push(`<div class="section_name svelte-1tond3t"><h3 class="svelte-1tond3t">${escape_html(sectionName)}</h3></div> <!--[-->`);
        const each_array_1 = ensure_array_like(issue?.articles?.filter((article) => article.section === sectionName));
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let articleContent = each_array_1[$$index];
          Issue_article($$renderer2, { articleData: articleContent });
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div> `);
      Footer($$renderer2);
      $$renderer2.push(`<!----> `);
      if (issue?.isIssueUltra) {
        $$renderer2.push("<!--[-->");
        Ultrabutton($$renderer2);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
