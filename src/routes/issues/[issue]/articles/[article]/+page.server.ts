import { error } from "@sveltejs/kit";
import articlesData from "$lib/articles_new.json";

export async function load({ params }) {
  const article = articlesData.find((a) => a.articleName === params.article);
  if (article) {
    return {
      props: {
        article,
      },
    };
  } else {
    return error(404, "Article not found");
  }
}
