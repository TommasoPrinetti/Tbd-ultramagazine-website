<script lang="ts">
    import { afterNavigate } from '$app/navigation';

    import ArticleHero from '$components/article/article_hero.svelte';
    import Header from "$components/header.svelte";
    import ArticleCorpus from '$components/article/article_corpus.svelte';
    import Footer from '$components/footer.svelte'
    import issuesDataJson from "$lib/issues_new.json";
    import articlesDataJson from "$lib/articles_new.json";

    import { isUltraMode } from '$lib/store';

    let { data }: any = $props();

    // Sanity mode normalizes heroImg; legacy JSON uses articleImg.
    let heroArticle = $derived(
        data.mode === 'sanity' ? {...data.article, articleImg: data.article.heroImg} : data.article
    );
    let article = $derived(data.article);
    let headerVar = 'ARTICLES';
</script>

<svelte:head>
    <title>{article.articleTitle}</title>
    <meta name="description" content={article.articleText} />

    <meta property="og:site_name" content="TBD ULTRAMAGAZINE" />
    <meta property="og:locale" content="it" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={article.articleTitle} />
    <meta property="og:description" content={article.articleText} />
    <meta property="og:image" content={heroArticle.articleImg} />
    <meta property="og:image:alt" content={article.articleTitle} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />

</svelte:head>

<Header {headerVar} issuesData={data.issues ?? issuesDataJson} temporaryCalls={data.temporaryCalls} topBanner={data.topBanner} />

<ArticleHero article={heroArticle}/>

<ArticleCorpus {article} related={data.related ?? null} slider={data.slider ?? null} issuesData={issuesDataJson} articlesData={articlesDataJson}/>
<Footer />
