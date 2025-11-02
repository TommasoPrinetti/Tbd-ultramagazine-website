<script lang="ts">
    import { goto } from '$app/navigation';
    import Header from '$components/header.svelte';
    import Footer from '$components/footer.svelte';
    import LandHero from '$components/landing_hero/landing_hero.svelte';
    import IssueContainer from '$components/issue_container/issue_container.svelte';
    import Ultrabutton from '$components/ultrabutton.svelte';
    import Divider from '$components/article/divider.svelte';

    let contentPrev = "TBD, acronimo di “To Be Defined”, è un progetto editoriale che dal 2019 pubblica volumi tematici e collabora con artist* per la realizzazione di eventi a essi collegati. Il percorso critico di ogni numero si sviluppa a partire da fatti d’attualità definiti zeitgeisting, notizie o icone virali che rivelano lo spirito culturale del tempo. Ogni fatto è sintomo e/o coadiuvante di tematiche più ampie, trattate sotto forma di saggi scritti e contenuti visivi. A partire da un focus specifico sulla contemporaneità"

    const TbdLogo = '/IDENTITY_IMAGES/tbd_LOGO.webp';

    let { data } = $props();

    console.log("📄 Temporary Calls:", data.temporaryCalls);

    // Helper function to create a slug from a title for URL routing
    function createSlug(title: string | null | undefined): string {
      if (!title) return "";
      return title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
    }
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

  <Header issuesData={data.issues} temporaryCalls={data.temporaryCalls}/>
  <LandHero />
  
  
  <div class="temporary_call_container vertical_flex" id="LATEST">
    <Divider category="temporary call" />
    <h2>
      {data.temporaryCalls[0]?.title}
    </h2>
  
    <img src={data.temporaryCalls[0]?.image} alt="Last Issue">
  
    <div class="temporary_call_text">
      <div class="vertical_flex" style="align-items: center; justify-content: center;">
          <a class="rounded_button" style="z-index: 2;"
          href={`/calls/${createSlug(data.temporaryCalls[0]?.title)}`}
          data-sveltekit-preload>
            <p class="p2">{data.temporaryCalls[0]?.ctaText}</p>
          </a>
      </div>
    </div>
  </div>


  <IssueContainer issuesData={data.issues}/>

    <section id="ABOUT"class="about ">
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

.temporary_call_container {
  width: 100%;
  height: fit-content;
  align-items: center;
  justify-content: center;
}

.temporary_call_container > h2 {
  text-align: center;
}

.temporary_call_container > img {
  width: 30%;
  aspect-ratio: auto;
  object-fit: containe;
  object-position: center;
}

.temporary_call_text {
  width: 100%;
  grid-column: span 16;
}

@media screen and (max-width: 480px) {
  .about {
    overflow: hidden;
    grid-template-columns: repeat(2, 1fr);
    padding: var(--spacing-s);
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

  .temporary_call_container > img {
    width: 80%;
    aspect-ratio: auto;
    object-fit: containe;
    object-position: center;
  }
}


</style>