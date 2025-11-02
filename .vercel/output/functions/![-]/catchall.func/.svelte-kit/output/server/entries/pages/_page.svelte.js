import { W as attr, X as stringify, Y as escape_html, Z as ensure_array_like, _ as head } from "../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../chunks/exports.js";
import "../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../chunks/header.svelte_svelte_type_style_lang.js";
import { H as Header, F as Footer } from "../../chunks/footer.js";
import { U as Ultrabutton } from "../../chunks/ultrabutton.js";
function Landing_hero($$renderer) {
  const TbdLogo = "/IDENTITY_IMAGES/tbd_LOGO.webp";
  $$renderer.push(`<div class="landing_hero svelte-j49o19"><img${attr("src", TbdLogo)} alt="TBD Logo" class="svelte-j49o19"/></div>`);
}
function Single_issue($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { issueData } = $$props;
    $$renderer2.push(`<a class="single_issue svelte-4i3lu8">`);
    if (issueData?.ultraHoverImg) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="single_issue_ultrahover svelte-4i3lu8"><img${attr("src", issueData.ultraHoverImg)}${attr("alt", `${stringify(issueData.issueTitle)} Ultra mode`)} class="svelte-4i3lu8"/></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <img${attr("src", issueData?.issueCover)}${attr("alt", issueData?.issueTitle)} class="svelte-4i3lu8"/> <p class="p3 svelte-4i3lu8">TBD #${escape_html(issueData?.issueTitle)}</p> <p class="p3 svelte-4i3lu8">`);
    if (issueData?.issuePrice) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`${escape_html(issueData?.issuePrice)}€`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<i>Preorder soon!</i>`);
    }
    $$renderer2.push(`<!--]--></p></a>`);
  });
}
function Single_card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { issueData } = $$props;
    $$renderer2.push(`<div class="card svelte-3enknf"><button aria-label="Go to issue"></button> <div class="card_image_container svelte-3enknf"><img${attr("src", issueData?.issueCover)} alt="" class="svelte-3enknf"/></div> <div class="card_text_container svelte-3enknf"><h3>${escape_html(issueData?.issueTitle)}</h3> <p class="p3 svelte-3enknf">${escape_html(issueData?.issueHeroText)}</p></div></div>`);
  });
}
function Divider($$renderer, $$props) {
  let { category } = $$props;
  $$renderer.push(`<div${attr("id", category)} class="divider vertical_flex svelte-1pzutb8"><hr class="svelte-1pzutb8"/> <h3 class="svelte-1pzutb8">${escape_html(category)}</h3></div>`);
}
function Issue_container($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { issuesData } = $$props;
    const regularIssues = issuesData.filter((issue) => issue.issueCategory === "issues" && issue.issueCover);
    const publications = issuesData.filter((issue) => issue.issueCategory === "publications" && issue.issueCover);
    const specialProjects = issuesData.filter((issue) => issue.issueCategory === "special projects" && issue.issueCover);
    $$renderer2.push(`<div class="vertical_flex">`);
    if (regularIssues.length > 0) {
      $$renderer2.push("<!--[-->");
      Divider($$renderer2, { category: "issues" });
      $$renderer2.push(`<!----> <div class="issues_container svelte-58a7ur" id="ISSUES"><div class="base_grid"><!--[-->`);
      const each_array = ensure_array_like(regularIssues);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let issue = each_array[$$index];
        Single_issue($$renderer2, { issueData: issue });
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="vertical_flex">`);
    if (publications.length > 0) {
      $$renderer2.push("<!--[-->");
      Divider($$renderer2, { category: "publications" });
      $$renderer2.push(`<!----> <div class="issues_container svelte-58a7ur" id="PUBLICATIONS"><div class="base_grid"><!--[-->`);
      const each_array_1 = ensure_array_like(publications);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let issue = each_array_1[$$index_1];
        Single_issue($$renderer2, { issueData: issue });
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="vertical_flex">`);
    if (specialProjects.length > 0) {
      $$renderer2.push("<!--[-->");
      Divider($$renderer2, { category: "special projects" });
      $$renderer2.push(`<!----> <div class="issues_container svelte-58a7ur" id="SPECIAL_PROJECTS"><div class="base_grid"><!--[-->`);
      const each_array_2 = ensure_array_like(specialProjects);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let issue = each_array_2[$$index_2];
        Single_card($$renderer2, { issueData: issue });
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let contentPrev = "TBD, acronimo di “To Be Defined”, è un progetto editoriale che dal 2019 pubblica volumi tematici e collabora con artist* per la realizzazione di eventi a essi collegati. Il percorso critico di ogni numero si sviluppa a partire da fatti d’attualità definiti zeitgeisting, notizie o icone virali che rivelano lo spirito culturale del tempo. Ogni fatto è sintomo e/o coadiuvante di tematiche più ampie, trattate sotto forma di saggi scritti e contenuti visivi. A partire da un focus specifico sulla contemporaneità";
    const TbdLogo = "/IDENTITY_IMAGES/tbd_LOGO.webp";
    let { data } = $$props;
    console.log("📄 Temporary Calls:", data.temporaryCalls);
    function createSlug(title) {
      if (!title) return "";
      return title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    }
    function getEuropeDateString() {
      const now = /* @__PURE__ */ new Date();
      return now.toLocaleDateString("sv-SE", { timeZone: "Europe/Rome" });
    }
    function toEuropeDateString(date) {
      return date.toLocaleDateString("sv-SE", { timeZone: "Europe/Rome" });
    }
    let isCallOpen = (() => {
      const call = data.temporaryCalls[0];
      if (!call?.openDate) return true;
      const nowStr = getEuropeDateString();
      const openDate = new Date(call.openDate);
      const openStr = toEuropeDateString(openDate);
      return nowStr >= openStr;
    })();
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>TBD ULTRAMAGAZINE</title>`);
      });
      $$renderer3.push(`<meta name="description"${attr("content", contentPrev)}/> <meta property="og:site_name" content="TBD ULTRAMAGAZINE"/> <meta property="og:locale" content="it"/> <meta property="og:type" content="article"/> <meta property="og:title" content="TBD ULTRAMAGAZINE"/> <meta property="og:description"${attr("content", contentPrev)}/> <meta property="og:image"${attr("content", `/IDENTITY_IMAGES/tbd_LOGO.webp`)}/> <meta property="og:image:alt" content="TBD ULTRAMAGAZINE"/> <meta property="og:image:width" content="1200"/> <meta property="og:image:height" content="627"/>`);
    });
    Header($$renderer2, { issuesData: data.issues, temporaryCalls: data.temporaryCalls });
    $$renderer2.push(`<!----> `);
    Landing_hero($$renderer2);
    $$renderer2.push(`<!----> `);
    if (isCallOpen && data.temporaryCalls[0]) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="temporary_call_container vertical_flex svelte-1uha8ag" id="LATEST">`);
      Divider($$renderer2, { category: "temporary call" });
      $$renderer2.push(`<!----> <h2 class="svelte-1uha8ag">${escape_html(data.temporaryCalls[0]?.title)}</h2> <img${attr("src", data.temporaryCalls[0]?.image)} alt="Last Issue" class="svelte-1uha8ag"/> <div class="temporary_call_text svelte-1uha8ag"><div class="vertical_flex" style="align-items: center; justify-content: center;"><a class="rounded_button" style="z-index: 2;"${attr("href", `/calls/${createSlug(data.temporaryCalls[0]?.title)}`)} data-sveltekit-preload=""><p class="p2">${escape_html(data.temporaryCalls[0]?.ctaText)}</p></a></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    Issue_container($$renderer2, { issuesData: data.issues });
    $$renderer2.push(`<!----> <section id="ABOUT" class="about svelte-1uha8ag"><div class="about_text_container svelte-1uha8ag"><h1>ABOUT</h1> <p class="p1">TBD - To Be Defined is an ultra-editorial project which provides the publication of a thematic magazine and the collaboration with artists for the realization of events related to it. Artists are invited to react to contents, theories and critical positions expressed in the magazine through the presentation of an action or an artwork.</p> <button class="rounded_button" data-sveltekit-preload=""><p class="p2">WE WRITE, WE CURATE</p></button></div> <div class="about_image_container svelte-1uha8ag"><a href="/about" data-sveltekit-preload="" class="svelte-1uha8ag"><img${attr("src", TbdLogo)} alt="" class="svelte-1uha8ag"/></a></div></section> `);
    Footer($$renderer2);
    $$renderer2.push(`<!----> `);
    Ultrabutton($$renderer2);
    $$renderer2.push(`<!---->`);
  });
}
export {
  _page as default
};
