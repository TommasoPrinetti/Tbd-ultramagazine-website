import { error } from "@sveltejs/kit";
import { a as articlesData } from "../../../../../../chunks/articles_new.js";
async function load({ params }) {
  const article = articlesData.find((a) => a.articleName === params.article);
  if (article) {
    return {
      props: {
        article
      }
    };
  } else {
    return error(404, "Article not found");
  }
}
export {
  load
};
