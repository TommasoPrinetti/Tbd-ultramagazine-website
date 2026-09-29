<script>
 let { article } = $props();

</script>

    <div class="base_grid article_hero">
        <div class="article_heroimg">
            <img src={article?.articleImg} alt="">
        </div>

        <div class="article_herotext">
            <h1>
                {article?.articleTitle}
            </h1>

            <h3>
                ../ {article?.parentIssue}
            </h3>

            <p class="p2">
                {article?.articleText}
            </p>

            <div style="display: flex; flex-direction: row; gap: 15px;">
                <button class="rounded_button">
                    <p class="p2">
                        #ARTICLE
                    </p>
                </button>

                <button class="rounded_button" >
                    <p class="p2">
                        #{article?.parentIssue}
                    </p>
                </button>
            </div>
        </div>
    </div>


<style>

.article_hero {
  border-bottom: solid var(--white-blue) 1px;
  border-top: solid var(--white-blue) 1px;
  overflow: hidden;
  height: fit-content;
  padding: 0px var(--spacing-l);
}

.article_herotext {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-m);
  align-items: left;
  grid-column: span 8;
  padding-top: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
}

.article_herotext h1 {
  text-transform: uppercase;
}

.article_hero > .article_herotext > .p2 {
  display: -webkit-box;
  width: 80%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  text-overflow: ellipsis;
}

:global(body.ultra > div > .article_hero > .article_herotext > .p2) {
  display: -webkit-box;
  width: 80%;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: unset;
  overflow: hidden;
  text-overflow: ellipsis;

  animation: whirlybatsAnimation 3s infinite;
}

.article_heroimg {
  display: block;

  grid-column: span 8;
  height: 100%;
  width: 100%;

  border-right: var(--white-blue) 1px solid;
  border-left: var(--white-blue) 0.5px solid;
}


</style>