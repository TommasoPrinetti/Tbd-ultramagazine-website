<script lang="ts">
    import { goto } from '$app/navigation';
    import Header from '$components/header/header.svelte';
    import Footer from '$components/footer/footer.svelte';
    import LandHero from '$components/landing_hero/landing_hero.svelte';
    import IssueContainer from '$components/issue_container/issue_container.svelte';
    import LatestIssue from '$components/latest_issue/latest_issue.svelte';
    import Ultrabutton from '$components/ULTRABUTTON/ultrabutton.svelte';
    import { afterNavigate } from '$app/navigation';

    let contentPrev = "TBD, acronimo di “To Be Defined”, è un progetto editoriale che dal 2019 pubblica volumi tematici e collabora con artist* per la realizzazione di eventi a essi collegati. Il percorso critico di ogni numero si sviluppa a partire da fatti d’attualità definiti zeitgeisting, notizie o icone virali che rivelano lo spirito culturale del tempo. Ogni fatto è sintomo e/o coadiuvante di tematiche più ampie, trattate sotto forma di saggi scritti e contenuti visivi. A partire da un focus specifico sulla contemporaneità"

    const TbdLogo = '/IDENTITY_IMAGES/tbd_LOGO.webp';

    let { data } = $props();
</script>

<svelte:head>
    <title>TBD ULTRAMAGAZINE</title>
  <meta name="description" content={contentPrev} />

  <meta property="og:site_name" content="TBD ULTRAMAGAZINE" />
  <meta property="og:locale" content="it" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="TBD ULTRAMAGAZINE" />
  <meta property="og:description" content={contentPrev} />
  <meta property="og:image" content={`/IDENTITY_IMAGES/tbd_LOGO.webp`} />
  <meta property="og:image:alt" content="TBD ULTRAMAGAZINE" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="627" />
</svelte:head>

{#key window.location.href}

  <Header issuesData={data.issues}/>
  <LandHero />
  <LatestIssue/>
  <IssueContainer issuesData={data.issues}/>

    <section id="ABOUT"class="about default_appear">
      <div class="about_text_container">
        <h1>
          ABOUT
        </h1>
        <p class="p1">
          TBD - To Be Defined is an ultra-editorial project which provides the publication of a thematic magazine and the collaboration with artists for the realization of events related to it. Artists are invited to react to contents, theories and critical positions expressed in the magazine through the presentation of an action or an artwork.
        </p>
        <button class="rounded_button" onclick={() => goto('/about')} data-sveltekit-preload>
          <p class="p2">
            WE WRITE, WE CURATE
          </p>
        </button>
      </div>
      
        <div class="about_image_container">
          <a onclick={() => goto('/about')} href="/about" data-sveltekit-preload>
            <img src={TbdLogo} alt="">
          </a>
        </div>
    </section>

  <Footer />
{/key}
<Ultrabutton />

<style>

.about {
  width: 100%;
  overflow: hidden;
  padding: var(--spacing-m);
}

.about_text_container {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-s);
  grid-column: span 7;
  justify-content: center;
  overflow: visible;
}

.about_image_container {
  display: block;
  position: relative;
  height: auto;
  grid-column: span 10;
}

.about_image_container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.about_image_container > a {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 480px) {
  .about {
    overflow: hidden;
    grid-template-columns: repeat(2, 1fr);
  }

  .about_text_container {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-s);
    grid-column: 1 / span 2;
    justify-content: center;
    height: fit-content;
  }

  .about_image_container {
    display: block;
    position: relative;
    transform: translate(0%);
    grid-column: 1 / span 2;
  }

  .about_image_container img {
    width: 100%;
  }
}


</style>