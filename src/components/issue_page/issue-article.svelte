<script>
    let { articleData } = $props();

    import { goto } from '$app/navigation';

</script>

<article class="base_grid">
        <div class="article_img_container">
            <img src={articleData.thumbnail.asset.url} alt="AltText">
        </div>

        <div class="vertical_flex article_text_container">
          <h2> {@html articleData.title} </h2>
          <p class="p3"> {@html articleData.description} </p>
        <!--
          <button class="rounded_button" onclick={() => { goto(`./${articleData.parentIssue}/articles/${articleData.articleName}`); }} data-sveltekit-reload>
              <p class="p2"> 
                  READ ALL
              </p>
          </button>-->
        </div>
</article>

<style>


article {
  width: 100%;
  height: fit-content;
  padding: 0px var(--spacing-l);

  border-style: solid;
  border-width: 1px 0px 0px 0px;
  border-color: var(--white-blue);
}

article h2 {
  text-transform: uppercase;
}

.article_img_container {
  height: 100%;
  width: 100%;
  grid-column: span 6;

  border-style: solid;
  border-color: var(--white-blue);
  border-width: 0px 1px;

  overflow: hidden;

  aspect-ratio: 16/9;
}

.article_img_container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.article_img_container img:hover {
  transform: scale(1.05);
  transition: transform 1s ease-in-out;
}

.article_text_container {
  grid-column: span 10;

  padding-top: var(--spacing-m);
  padding-bottom: var(--spacing-m);

  align-items: flex-start;
  justify-content: center;
}

.article_text_container > p {
  width: 80%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 480px) {

  

  article {
    width: fit-content;
    height: fit-content;
    border-width: 0px 0px 0px 0px;
    padding: var(--spacing_zero) var(--spacing-m) var(--spacing_zero)
      var(--spacing-m);
  }

  .article_img_container {
    width: 100%;
    height: fit-content;
    aspect-ratio: 4/3;
    grid-column: 1 / span 2;
    border-style: solid;
    border-width: 0px 0px 0.5px 0px;
  }

  .article_text_container {
    height: fit-content;
    grid-column: 1 / span 2;
    display: flex;
    flex-direction: column;

    padding: var(--spacing-s);
    row-gap: var(--spacing-s);

    vertical-align: middle;
    justify-content: center;
  }

  article section {
    grid-template-columns: repeat(2, 1fr);
    margin-top: 0;

    gap: var(--spacing_xs);
    padding: 0;

    border-style: solid;
    border-width: 0.75px;
    border-color: var(--white-blue);

    border-radius: 10px;
    overflow: hidden;
  }

  article .p3 {
    max-width: 90%;
  }
}
</style>