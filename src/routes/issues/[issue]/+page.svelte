<script lang="ts">
    import CowElement from '$components/issue_page/cow-element.svelte';
    import IssueHero from '$components/issue_page/issue-hero.svelte';
    import MagGallery from '$components/issue_page/mag-gallery.svelte';
    import Header from '$components/header.svelte';
    import Footer from '$components/footer.svelte';
    import IssueArticle from '$components/issue_page/issue-article.svelte';
    import Ultrabutton from '$components/ultrabutton.svelte';
    import Manifesto from '$components/manifesto.svelte';
    import { isUltraMode } from '$lib/store';
    import { afterNavigate } from '$app/navigation';
  
    let { data } = $props();
    
    let issue = $state(data?.issue);
    let issues = $state(data?.issues || []);
    let temporaryCalls = $state(data?.temporaryCalls || []);

    $effect(() => {
      issue = data?.issue || {};
      issues = data?.issues || [];
      temporaryCalls = data?.temporaryCalls || [];
    });

    $inspect("📄 Page data:", issue);
    $inspect("📄 Issue Title:", issues);

    let sectionNames = $derived(
      issue?.articles && Array.isArray(issue.articles)
        ? [...new Set(issue.articles.map((article: any) => article.section).filter(Boolean))]
        : []
    );


    $effect(() => {
      if (typeof window !== "undefined") {
        const bodyClassList = document.body.classList;
        if (!issue?.isIssueUltra) {
          bodyClassList.add('default');
          bodyClassList.remove('ultra');
          isUltraMode.set(false);
        }
      }
    });

    afterNavigate(() => {
      console.log("afterNavigate");
      if (!issue?.isIssueUltra && $isUltraMode === true) {
        isUltraMode.set(false);
      }
    });

  </script>

<svelte:head>
  <title>{issue?.issueTitle}</title>
  <meta name="description" content={issue?.issueHeroText} />

  <meta property="og:site_name" content="TBD ULTRAMAGAZINE" />

  <meta property="og:locale" content="it" />

  <meta property="og:type" content="issue" />

  <meta property="og:title" content={issue?.issueTitle} />
  <meta property="og:description" content={issue?.issueHeroText} />
  <meta property="og:image" content={issue?.issueThumbnail} />

  <meta property="og:image:alt" content={issue?.issueTitle} />

  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
</svelte:head>
  
  <Header issuesData={issues} temporaryCalls={data.temporaryCalls} headerVar = 'ISSUES'/>

  {#key issue?.issueTitle || issue?._id}
  <IssueHero 
  issueData={issue}/>
  

  {#await issue?.galleryImages}
  <p>Loading gallery images...</p>
    {:then galleryImages}
    {#if issue?.layoutOption === 'Classic'}
        {#if $isUltraMode}
          <MagGallery images={issue.UltraGalleryImages} />
        {:else}
          <MagGallery images={galleryImages} />
        {/if}
      {:else if issue?.layoutOption === 'Manifesto'}
        {#if issue?.manifestoTitle}
          <Manifesto {...issue} id="ABSTRACT" />
        {/if}

      {:else if issue?.layoutOption === 'Ibrido'}
          {#if $isUltraMode}
            <MagGallery images={issue.UltraGalleryImages} />
          {:else}
            <MagGallery images={issue.galleryImages} />
          {/if}
        {#if issue?.manifestoTitle}
          <Manifesto {...issue} id="ABSTRACT" />
        {/if}
        {#if issue?.CowElementText}
          <CowElement issueData={issue} />
        {/if}
      {/if}
  {/await}

  {#if issue?.issueTitle === 'ISSUE 3'}
    <div class="video_gallery ">
          <div class="single_video" id="video_#1">
              <div style="padding:100% 0 0 0;position:relative;">
                  <iframe src="https://player.vimeo.com/video/637629288?h=66b3ae91f8" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
                  </iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
          <div class="single_video" id="video_#2">
              <div style="padding:100% 0 0 0;position:relative;">
                  <iframe src="https://player.vimeo.com/video/637612946?h=13fe136ba9" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
                  </iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
          <div class="single_video" id="video_#3">
              <div style="padding:100% 0 0 0;position:relative;">
                  <iframe src="https://player.vimeo.com/video/637618840?h=94b5d22c38" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
                  </iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
          <div class="single_video" id="video_#4">
              <div style="padding:100% 0 0 0;position:relative;">
                  <iframe src="https://player.vimeo.com/video/637623042?h=365c31a28b" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen>
                  </iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
    </div>
  {/if}

  <div class="article_list_container" id="ARTICLES">
    {#each sectionNames as sectionName}
      <div class="section_name">
        <h3>{sectionName}</h3>
      </div>
      {#each issue?.articles?.filter((article: any) => article.section === sectionName) as articleContent}
        <IssueArticle
          articleData = {articleContent}
         />
      {/each}
    {/each} 
  </div>

<Footer />

{#if issue?.isIssueUltra}
  <Ultrabutton />
{/if}

{/key}
<style>

.video_gallery {
  width: 100%;
  height: fit-content;

  display: grid;
  grid-template-columns: repeat(16, 1fr);
  flex: 1;
  flex-direction: column;
  gap: var(--spacing-m);
  padding: 0px var(--spacing-l);
}

.article_list_container {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding: 0px;
  row-gap: 0px;

  border-bottom: var(--white-blue) 0.5px solid; 
}

.video_gallery > * {
  grid-column: span 8;
}

.section_name {
  padding: var(--spacing-m) var(--spacing-l);
  border-top: solid 1px var(--white-blue) ;
}

.section_name h3 {
  text-transform: uppercase;
  opacity: 0.5;
}

iframe {
  frameborder: 0;
}

:global(iframe.footer) {
  width: 100%;
  height: 280px;
}

:global(.iframe.header_iframe) {
  width: 100%;
  height: 100%;
}



@media screen and (max-width: 480px) {
  .video_gallery {
    row-gap: var(--spacing-s);
  }

  .video_gallery > * {
    grid-column: span 2;
  }

  .article_list_container {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-m);
    padding-bottom: var(--spacing-s);
  }

  .single_video {
    grid-column: 1 / -1;
  }

  .single_video iframe {
    height: 700px;
    width: 700px;
  }

  iframe.footer {
    width: 100%;
    height: 200px;
  }

  .section_name {
    padding: var(--spacing-s);
    border-top: solid 1px var(--white-blue) ;
  }

  .section_name h3 {
    text-align: left;
  }
}
</style>
  
