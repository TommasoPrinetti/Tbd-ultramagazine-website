<script>
    import { tick } from 'svelte';
    import { goto } from '$app/navigation';
    
    import BuyButtons from "$components/buy_buttons.svelte";
    import BuyingSlider from "$components/sliders/buying_slider.svelte";
    import ArticleGallery from "./article_gallery.svelte";

    const TbdLogo = '/IDENTITY_IMAGES/tbd_LOGO.webp';

    let { article, issuesData, articlesData } = $props();

    let isSliderOpen = $state(false);
    let reloadStatus = $state(false);

    let relatedArticles = $derived(article ? articlesData.filter(a => a.parentIssue === article.parentIssue && a.articleName !== article.articleName) : []);

    let currentIssueData = $derived(article ? issuesData.find(issue => String(issue.issueTitle) === String(article.parentIssue)) || {} : {});

    let rowsDidascalie = $derived(article?.didascalie && typeof article.didascalie === 'string' ? article.didascalie.split('*').filter(Boolean) : []);

    let rowsBibliografie = $derived(article?.bibliografie && typeof article.bibliografie === 'string' ? article.bibliografie.split('*').filter(Boolean) : []);

    function navigateToArticle(relatedArticle) {
        const url = `../../../issues/${relatedArticle.parentIssue}/articles/${relatedArticle.articleName}`;

        const opts = {
            replaceState: true,
            noScroll: false,
            keepFocus: true,
            invalidateAll: true,
        }

        goto(url, opts);

        reloadStatus = !reloadStatus
        tick();
    }

    function handleSliderToggle() {
        isSliderOpen = !isSliderOpen;
    }

</script>

    <div class="base_grid article_corpus">
            <div class="side_menu vertical_flex">
                <div class="index_container vertical_flex">
                    <div class="vertical_flex">
                        {#each relatedArticles as relatedArticle, index}
                            <a data-sveltekit-preload-data onclick={() => navigateToArticle(relatedArticle)} data-sveltekit-reload aria-roledescription="Navigate to article">
                                <p class="p3">#{0}{index+1}: {@html relatedArticle.articleTitle}</p>
                            </a>
                        {/each}
                    </div>

                    <div class="buybuttons">
                        {#each [1, 2, 3] as _}
                            <BuyButtons onclick={handleSliderToggle} />
                        {/each} 
                    </div>
                </div>
                
                <img src={TbdLogo} alt="">
                    <div class="index_container vertical_flex">
                        <div class="vertical_flex">
                            <p class="p3">
                                <span> <span class="d2" style="font-style: italic;">TBD {article?.parentIssue} </span></span>
                            </p>

                            <p class="p3">
                                <span> <span class="d2" style="font-style: italic;">{article?.autore}</span></span>
                            </p>

                            <p class="p3">
                                <span> <span class="d2" style="font-style: italic;">{article?.note_autore} </span></span>
                            </p>
                        </div>
                    </div>
            </div>

        <article class="read" id="READ">
            <div style="display: flex; flex-direction: column; gap: var(--spacing-s);">
                <h2>
                    {article?.articleTitle}
                </h2>

                {#each Object.keys(article?.articleContent) as key (key)}
                    {#if key.startsWith('p') && article?.articleContent[key]}
                        {#each article?.articleContent[key].split('\n') as line}
                            <p class="p2">{@html line}</p>
                        {/each}
                    {:else if key.startsWith('img') && article?.articleContent[key]}
                            <img src={article?.articleContent[key]} alt=""/>
                    {:else if key.startsWith('gallery') && article?.articleContent[key]}
                        <ArticleGallery galleryFolderPath={article?.articleContent[key]}/>
                    {/if}
                {/each}
                
            </div>
            
            <div class="vertical_flex">
                {#if article?.showDidascalie}
                    <span style="font-weight: 800;">Didascalie:</span>
                    {#each rowsDidascalie as didascalia, index}
                        <p class="d2">[{index + 1}] {didascalia}</p>
                    {/each}
                {/if}
            </div>
            
            <div class="vertical_flex">
                {#if article?.showBibliografia && rowsBibliografie}
                    <span style="font-weight: 800;">Bibliografia:</span>
                    {#each rowsBibliografie as bibliografia}
                        <p class="d2">● {bibliografia}</p>
                    {/each}
                {/if}
            </div>
        </article>
    </div>

<BuyingSlider
    bind:isSliderOpen
    issueCover={currentIssueData.issueCover}
    issuePrice={currentIssueData.issuePrice}
    issueTitle={article?.issueTitle}
/>


<style>

.read {
  grid-column: span 10;
  height: auto;
  padding-top: var(--spacing-m);
  margin-bottom: var(--spacing_zero);
  padding-bottom: var(--spacing-s);

  display: flex;
  flex-direction: column;

  gap: var(--spacing-m);
  overflow: visible;
}

.read .p2,
.d2 {
  hyphens: auto;
}
.read h2 {
  text-transform: uppercase;
}

.read img {
  width: 60%;
  height: auto;
  border-color: white;
  border: 1px solid white;
  border-radius: 2px;
  box-sizing: border-box;
  align-self: center;
}

.article_corpus {
  padding: 0px var(--spacing-l);
  border-top: solid var(--white-blue) 2px;
  border-bottom: solid var(--white-blue) 2px;
  height: fit-content;
  position: relative;
}

.side_menu {
  grid-column: span 4;
  padding: var(--spacing-m) 0px;

  position: sticky;
  top: 120px;

  height: fit-content;
  overflow: hidden;
}

.side_menu img {
  width: 50%;
}

.index_container {
  padding: var(--Spacing_Zero, 0px);
  row-gap: var(--spacing-m);
  height: 100%;
  position: relative;
}

.index .p3 {
  text-transform: uppercase;
  width: 90%;
}

.index .p3:hover {
  text-transform: uppercase;
  text-decoration: underline;
}

.index svg {
  display: none;
  width: "130";
  height: "2";
  fill: "none";
}

@media screen and (max-width: 480px) {
    .read {
        grid-column: span 2;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-m);
        overflow-x: hidden;
    }

    .read img {
        width: 100%;
        height: auto;
        border-color: white;
        border: 0, 5px solid white;
        border-radius: 1px;
        box-sizing: border-box;
    }

    .article_2 {
        grid-template-columns: repeat(2, 1fr);
        display: flex;
        flex-direction: column-reverse;

        border-top-width: 0px;

        margin-top: 0;
        gap: var(--spacing-s);
        height: fit-content;
    }

    .index_container {
        margin-bottom: var(--spacing-s);
        height: auto;
    }

    .index {
        gap: var(--spacing-xs);
    }

    .index svg {
        display: block;
    }

    .side_menu {
        display: flex;
        padding-bottom: 0;
        justify-content: flex-start;
        height: fit-content;
    }

    .side_menu img {
        width: 100%;
    }
}

</style>