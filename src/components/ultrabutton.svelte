<script lang="ts">
  import { onMount } from 'svelte';
  import { isUltraMode } from '$lib/store';
  import { slide } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let isDefault = false;
  let shouldAnimate = false;
  let previousUltraMode = $isUltraMode;
  let transitionBlock: HTMLDivElement | undefined;

  // Watch for changes in isUltraMode
  $: if ($isUltraMode !== previousUltraMode) {
    shouldAnimate = true;
    previousUltraMode = $isUltraMode;
    // Reset animation flag and transform after animation completes
    setTimeout(() => {
      shouldAnimate = false;
      if (transitionBlock) {
        transitionBlock.style.transform = 'translateX(-100%)';
      }
    }, 2200);
  }

  function toggleUltraMode() {
    $isUltraMode = !$isUltraMode;
    if ($isUltraMode) {
      setTimeout(updateBodyClass, 1000);
      isDefault = false;
    } else {
      setTimeout(updateBodyClass, 1000);
      isDefault = true;
    }
  }

  const TbdLogo = '/IDENTITY_IMAGES/tbd_LOGO.webp';

  function updateBodyClass() {
    if (typeof window !== "undefined") {
      const bodyClassList = document.body.classList;
      if ($isUltraMode) {
        bodyClassList.add('ultra');
        bodyClassList.remove('default');
      } else {
        bodyClassList.add('default');
        bodyClassList.remove('ultra');
      }
    }
  }

  onMount(() => {
    updateBodyClass();
  });

</script>


<div class="ultrabutton_container">
  <button class="rounded_button {$isUltraMode ? 'inactive' : 'active'}" onclick={toggleUltraMode}>
    <p class="p2" style="color: inherit">DEFAULT</p>
  </button>

  <button class="rounded_button {$isUltraMode ? 'active' : 'inactive'}" onclick={toggleUltraMode}>
    <p class="p2" style="color: inherit">ULTRA</p>
  </button>
</div>

<!--<div class="ultrawhiteblob">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 81">
    <path d="M0 29V95.5H1440V29H873.519C851.532 29 830.235 21.3233 813.305 7.29514C807.614 2.58019 800.456 0 793.066 0H645.919C639.242 0 632.832 2.62314 628.07 7.30424C613.926 21.2085 594.886 29 575.052 29H0Z"/>
  </svg>
</div>-->

<div class="transition_block" class:animate={shouldAnimate} bind:this={transitionBlock}>
  <img src={TbdLogo} alt="Logo of tbd">
</div>


<style>

.ultrawhiteblob {
  width: 100vw;
  height: auto;

  position: fixed;

  bottom: -4.2vh;
  align-self: center;

  z-index: 30;
  offset-anchor: 50%;
}

.ultrabutton_container {
  position: fixed;
  border: 1px solid var(--white-white);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-s);
  z-index: 41;
  bottom: 3%;
  border-radius: 40px;
  background-color: var(--black-blue);
  padding: var(--spacing-xs);
}

.active {
  background-color: var(--white-white);
  color: var(--black-blue);
}

.inactive {
  background-color: transparent;
  color: var(--white-white);
  border: 0px;
}

.p2 {
  font-family: Arial, Helvetica, sans-serif;
}

.transition_block {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--black-blue);
  z-index: 50;
  pointer-events: none;
  transform: translateX(-100%);
  transition: all 0.2s ease-in-out;
}

.transition_block.animate {
  opacity: 1;
  animation: block_slide_in 2s ease-in-out forwards 0.2s;
}

.transition_block > img {
  width: 20%;
  height: auto;
  object-fit: contain;
  object-position: center;
  padding-top: var(--spacing-l);
}

@keyframes block_slide_in {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media screen and (min-width: 1512px) {
  .ultrawhiteblob {
    width: 2360px;
    height: auto;

    position: fixed;

    bottom: -1.5vh;
    align-self: center;

    z-index: 30;
    offset-anchor: 50%;
  }
}

.ultrawhiteblob > svg {
  fill: var(--black-blue);
  stroke-width: 0.5px;
  stroke: var(--white-white);
  transition: all 0.4s ease-in-out;
}

@media screen and (max-width: 480px) {
  .ultrabutton_container {
    
    padding: var(--spacing-xs);
    
  }

  .active {
    border: 1px solid var(--black-blue);
    color: var(--black-blue);
  }
}
</style>