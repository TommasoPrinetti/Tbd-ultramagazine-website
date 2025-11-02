<script lang="ts">
    import { afterNavigate } from '$app/navigation';

    import ArticleHero from '$components/article/article_hero.svelte';
    import Header from "$components/header.svelte";
    import ArticleCorpus from '$components/article/article_corpus.svelte';
    import Footer from '$components/footer.svelte'
    import issuesData from "$lib/issues_new.json";
    import articlesData from "$lib/articles_new.json";

    import { isUltraMode } from '$lib/store';

    let { data } = $props();
    
    let article = $derived(data.props.article);
    let headerVar = 'ARTICLES';

    afterNavigate(() => {
        updateBodyClass();
    });

    function updateBodyClass() {
        if (typeof window !== "undefined") {
            const bodyClassList = document.body.classList;
            if (!data.props.issue?.isIssueUltra) {
                    bodyClassList.add('default');
                    bodyClassList.remove('ultra');
                    isUltraMode.set(false);
                }
            }
        }
</script>

<svelte:head>
    <title>{article.articleTitle}</title>
    <meta name="description" content={article.articleText} />

    <meta property="og:site_name" content="TBD ULTRAMAGAZINE" />
    <meta property="og:locale" content="it" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content={article.articleTitle} />
    <meta property="og:description" content={article.articleText} />
    <meta property="og:image" content={article.articleImg} />
    <meta property="og:image:alt" content={article.articleTitle} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />

</svelte:head>

<Header {headerVar} issuesData={issuesData} />

<ArticleHero article={article}/>

<ArticleCorpus article={article} issuesData={issuesData} articlesData={articlesData}/>
<Footer />