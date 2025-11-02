<script lang="ts">
  import { goto } from '$app/navigation';
  import { isMenuOpen, headerHeight } from '$lib/store';
  import { fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';

  const TbdLogo = '/IDENTITY_IMAGES/tbd_LOGO.webp';

  let { headerVar = 'COMMON', issuesData, temporaryCalls } = $props();
  
  const latestIssue = (issuesData?.find((issue: any) => issue.isLatestIssue === true));

  function navigateTo(url: string | URL, options?: {
    replaceState?: boolean;
    noScroll?: boolean;
    keepFocus?: boolean;
  }) {
    const urlString = typeof url === 'string' ? url : url.toString();
    
    if (urlString.includes('#')) {
      const [path, hash] = urlString.split('#');
      const targetPath = path === '/' || path === '' ? '/' : path;
      goto(`${targetPath}#${hash}`, {
        ...options,
        invalidateAll: true,
        noScroll: false,
      });
      return;
    }

    const fullUrl = urlString.startsWith('/') ? urlString : `/issues/${urlString}`;
    goto(fullUrl, {
      ...options,
      invalidateAll: true,
      replaceState: true,
    });
  }

  function toggleMenu() {
    $isMenuOpen = !$isMenuOpen;
  }

  let repeatText = $derived(` © TBD ULTRAMAGAZINE - ${temporaryCalls[0]?.title} - `.repeat(100));

  afterNavigate(() => {
    if ($isMenuOpen) {
      toggleMenu();
    }
  });

  let headerTopElement: HTMLElement | null = null;
  let headerLowerElement: HTMLElement | null = null;


  onMount(() => {
    if (headerTopElement && headerLowerElement) {
      headerHeight.set(headerTopElement.clientHeight + headerLowerElement.clientHeight);
    }
  });

</script>

{#snippet header_buttons_container(type: string)}
  {#if type === 'COMMON'}
    <a class="rounded_button" href="#LATEST">
      <p class="p2"> 
          LATEST
      </p>
    </a>
    <a class="rounded_button" href="#ISSUES">
      <p class="p2"> 
          ISSUES
      </p>
    </a>
    <a class="rounded_button" href="#ABOUT">
      <p class="p2"> 
          ABOUT
      </p>
    </a>
  {:else if type === 'ARTICLES' || type === 'ISSUES'}
    <a class="rounded_button" href="#ISSUE">
      <p class="p2"> 
          ISSUE
      </p>
    </a>
    <a class="rounded_button" href="#ABSTRACT">
      <p class="p2"> 
          ABSTRACT
      </p>
    </a>
    <a class="rounded_button" href="#ARTICLES">
      <p class="p2"> 
          ARTICLES
      </p>
    </a>
  {:else if type === 'ABOUT'}
    <!--- NOTHING --->
  {/if}
{/snippet}

<header id={headerVar} class="vertical_flex">
    <a class="header_top"
    bind:this={headerTopElement}
    href='https://www.liste.ch/en/home.html'
    target="_blank"
    rel="noopener noreferrer">
      <div class="banner">
        <p class="p3"> 
          {@html repeatText}
        </p> 
      </div>
    </a>
    
    <div class="header_lower" bind:this={headerLowerElement}>
        <div class="header_buttons_container">
          {@render header_buttons_container(headerVar)}
        </div>

        <a onclick={() => navigateTo('/')} data-sveltekit-preload class="header_logo">
            <img src={TbdLogo} alt="TBDLogoImage">
        </a>

        <button class="burger_container" onclick={toggleMenu} aria-label="Toggle Menu" aria-roledescription="Toggle Menu" tabindex="0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
          </svg> 
        </button>
    </div>
    {#if $isMenuOpen}
  <div class="slide_in_major vertical_flex" transition:fade={{ duration: 300, easing: cubicOut }}>
    <div class="slide_in_container">
      {#if latestIssue}
      <div class="last_issue_container vertical_flex">
          <h3>{latestIssue?.issueTitle}</h3>
          <img src={latestIssue.issueCover} alt="Latest Issue">
          <a class="rounded_button" onclick={() => navigateTo(latestIssue?.issueTitle || '')}>
            <p class="p2">IS OUT NOW!</p>
          </a> 
      </div>
      {/if}
      <div class="titles_container vertical_flex">
        <a href="#ISSUES" onclick={() => navigateTo('/#ISSUES')}>
          <p class="p1" style="text-decoration: underline;">ISSUES</p>
        </a>
        
        {#each (issuesData || []) as issue}
        {#if issue.issueCategory === 'issues'}
          <a onclick={() => navigateTo(issue.issueTitle)} data-sveltekit-preload class="link">  
            <p class="p1" style="padding-bottom: 0px; font-weight: 400;">
                → {issue.issueTitle}
            </p>
          </a>
          {/if}
        {/each}
      </div>
      
      <div class="titles_container vertical_flex">
        <a href="#PUBLICATIONS" onclick={() => navigateTo('#ISSUES')}>
          <p class="p1" style="text-decoration: underline;">PUBLICATIONS</p>
        </a>
        
        {#each (issuesData || []) as publication}
        {#if publication.issueCategory === 'publications'}
          <a onclick={() => navigateTo(publication.issueTitle)} data-sveltekit-preload class="link">
            <p class="p1" style="padding-bottom: 0px; font-weight: 400;">
                → {publication.issueTitle}
            </p>
          </a>
          {/if}
        {/each}
      </div>
      <div class="titles_container vertical_flex">
        <a href="#SPECIAL_PROJECTS" onclick={() => navigateTo('#SPECIAL_PROJECTS')}>
          <p class="p1" style="text-decoration: underline;">SPECIAL PROJECTS</p>
        </a>
        {#each issuesData as specialProject}
        {#if specialProject.issueCategory === 'special projects'}
        <a onclick={() => navigateTo(specialProject.issueTitle)} data-sveltekit-preload class="link">
          <p class="p1" style="padding-bottom: 0px; font-weight: 400;">
              → {specialProject.issueTitle}
          </p>
        </a>
        {/if}
      {/each}
                        </div>
      <div class="about_container vertical_flex">
        <a onclick={() => navigateTo('/about')}>
                        <h3>
                            ABOUT
                        </h3>
                    </a>
        
                </div>

      <div class="instagram_container vertical_flex">
        <a onclick={() => navigateTo('https://www.instagram.com/tbd.ultramagazine/')} target="_blank" rel="noopener noreferrer">
                    <h3>
                      INSTAGRAM
                    </h3>
                  </a>
                
            </div>
        </div>

    <div class="slide_footer vertical_flex">
              <div class="footer_text_container">
                  <p class="p1">
                  © TBD ULTRA MAGAZINE 2024
                  </p>
                  <a href="mailto:info@tbdultramagazine.com">
                    <p class="p3">
                      info@tbdultramagazine.com
                    </p>
                  </a>
              </div>
    </div>
  </div>
{/if}
</header>


<style>
header {
  position: fixed;
  row-gap: 0px;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: transparent;
  z-index: 1000;
  transition: background-color 1s ease-in-out;
  pointer-events: none;
}

.p1, .p2, h3 {
  font-family: Helvetica;
}

.header_top {
  display: block;
  height: var(--spacing-m);
  background-color: var(--white-white);
  overflow: hidden;
  white-space: nowrap;
  color: var(--black-blue);
  pointer-events: all;
  position: relative;
}

  .banner {
    display: inline-flex;
    animation: scroll 600s linear;
    align-items: center;
    width: fit-content;
    white-space: nowrap;
    height: 100%;
    width: fit-content;
  }

  .banner > p {
    white-space: nowrap;
  }

  .header_lower {
    width: 100%;
    height: fit-content;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    padding: var(--spacing-s);
    background-color: var(--black-blue);
    pointer-events: all;
    border-bottom: 1px solid var(--white-white);
  }

  .header_logo {
    grid-column: 2;
    height: 50px;
    max-width: 120px;
    place-self: center center;
  }

  .header_logo > img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }

  .header_buttons_container {
    grid-column: 1;
    width: fit-content;
    height: fit-content;
    display: flex;
    gap: var(--spacing-s);
    align-items: center;
    color: var(--white-white);
    place-self: center start;
  }

  .burger_container {
    grid-column: 3;
    width: 35px;
    height: 35px;
    place-self: center end;
    background-color: transparent;
    border: 0px;
  }

  .burger_container > svg {
    width: 100%;
    height: 100%;
    fill: var(--white-white);
  }

  /* Slide-in Menu */

  .slide_in_major {
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: -1;
    background-color: var(--black-white);
    row-gap: 0px;
    pointer-events: all;
  }

  .slide_footer {
    height: 10%;
    align-items: center;
    justify-content: center;
    width: 100%;  
    border: 1px solid var(--white-blue);
    color: var(--white-blue);
  }

  .slide_in_container {
    display: grid;
    grid-template-rows: repeat(6, 1fr);
    grid-template-columns: repeat(16, 1fr);
    height: 100%;
}

  .slide_in_container > div {
    border: 1px solid var(--white-blue);
}

  .slide_in_container :nth-child(1) {
    grid-column: span 4;
    grid-row: span 6;
    overflow: hidden;
    place-items: center;
}

  .last_issue_container {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacing-s);
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: var(--spacing-m); 
    border: 0px;
    color: var(--white-blue);
}

  .last_issue_container > img {
    width: 70%;
  height: auto;
    aspect-ratio: 3/5;
}

  .titles_container {
    width: 100%;
    padding: var(--spacing-m);
    grid-column: span 4;
    grid-row: span 4;
}

  .titles_container > a > .p1 {
    text-transform: uppercase;
    text-align: left;
    font-weight: 600;
    padding-bottom: var(--spacing-s);
  }

  .titles_container > a:hover {
    text-decoration: underline !important;
  }

  .titles_container > a > .p1 {
    line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    --webkit-line-clamp: 1;
}

  .about_container {
    grid-column: span 12 / 17;
    grid-row: 5;
    text-align: center;
    justify-content: center;
}

  .instagram_container {
    grid-column: span 12 / 17;
    grid-row: 6;
    text-align: center;
    justify-content: center;
}

  .footer_text_container {
  display: flex;
  flex-direction: column;
    align-items: center;
    width: fit-content;
    padding: var(--spacing-s);
    row-gap: 2px;
}

.link {
  display: block;
}

.link >  .p1 {
  padding-bottom: 0px;
}

  /* Animations */
  @keyframes scroll {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(100%);
    }
  }

  /* Mobile Styles */
  @media screen and (max-width: 480px) {
    .header_buttons_container {
      display: none;
    }

    .header_top {
      height: 2vh;
    }

    .header_lower {
      padding: var(--spacing-xs) var(--spacing-s);
    }

    .header_logo {
      height: 50px;
      grid-column: 1;
      place-self: center start;
    }

    .slide_in_container {
      display: flex;
      flex-direction: column;
      row-gap: 0px;
    }

    .last_issue_container {
      padding: var(--spacing-s);
      display: flex;
      flex-direction: row;
      height: 35%;
      column-gap: var(--spacing-s);
    }

    .titles_container {
      padding: var(--spacing-s);
    }

    .last_issue_container > img {
      width: 30%;
      aspect-ratio: 3/5;
    }

    .titles_container > a > .p1 {
      padding: 0px;
      text-align: left;
      place-self: start;
    }

    .about_container, .instagram_container {
      height: 20%;
      padding: var(--spacing-s);
    }

    .link {
      display: none;
    }
  }
</style>