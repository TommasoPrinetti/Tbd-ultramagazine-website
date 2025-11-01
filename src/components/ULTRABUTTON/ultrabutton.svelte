<script>
  import { onMount } from 'svelte';
  import { isUltraMode } from '$lib/store';

  let isDefault = false;

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


<button class="ULTRABUTTON" onclick={toggleUltraMode} aria-label="Toggle Ultra Mode" tabindex="0">
  <div class="bg_solid"></div>
  <div class="left_text">
    <p class="p3">DEFAULT</p>
  </div>

  <div class="right_text">
    <p class="p3">ULTRA</p>
  </div>
</button>

<div class="ultrawhiteblob">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 81">
    <path d="M0 29V95.5H1440V29H873.519C851.532 29 830.235 21.3233 813.305 7.29514C807.614 2.58019 800.456 0 793.066 0H645.919C639.242 0 632.832 2.62314 628.07 7.30424C613.926 21.2085 594.886 29 575.052 29H0Z"/>
  </svg>
</div>

<div class="ultra_transition" class:animate={$isUltraMode}>
  <img src={TbdLogo} alt="">
</div>

<div class="default_transition" class:animate={isDefault}>
  <img src={TbdLogo} alt="">
</div>

<style>

.ultrawhiteblob {
  width: 1860px;
  height: auto;

  position: fixed;

  bottom: -4.2vh;
  align-self: center;

  z-index: 30;
  offset-anchor: 50%;
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


.ULTRABUTTON {
  display: inline-flex;
  height: 30px;
  width: 180px;
  padding: 7px var(--spacing-s) 7px 19px;
  align-items: center;
  gap: var(--spacing-m);

  position: fixed;
  bottom: 2.2vh;
  align-self: center;

  background-color: var(--black-blue);
  border-radius: 30px;
  overflow: hidden;

  transition: all 0.4s ease-in-out;

  z-index: 41;
}

body.default > div > .ULTRABUTTON > .bg_solid {
  border-radius: 30px;
  background: var(--white-white);
  box-shadow: 0px 0px 3.5px 0px rgba(226, 58, 58, 0.25);
  width: 50%;
  height: 80%;

  position: absolute;
  -ms-flex-align: left;
  z-index: 1;

  left: 25%;
  transform: translate(-45%);
  transition: all 0.4s ease-in-out;
}

body.ultra > div > .ULTRABUTTON > .bg_solid {
  border-radius: 30px;
  overflow: hidden;
  background: var(--white-white);
  box-shadow: 0px 0px 3.5px 0px rgba(226, 58, 58, 0.25);
  width: 40%;
  height: 80%;

  position: absolute;
  -ms-flex-align: left;
  z-index: 1;
  left: 25%;
  transform: translate(+75%);
  transition: all 0.4s ease-in-out;
}

.left_text {
  text-transform: uppercase;
  width: 50%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: var(--black-white);
  opacity: 100%;
  transition: all 0.4s ease-in-out;
}

.right_text {
  text-transform: uppercase;
  width: 50%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  color: var(--white-blue);
  transition: all 0.4s ease-in-out;
}


@keyframes slideInOut {
  0% {
    transform: translateX(-100%);
    opacity: 1;
  }
  60% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 1;
  }
}

.ultra_transition {
  position: fixed;
  width: 105vw;
  height: 100vh;
  top: 0;
  transform: translateX(-120%);

  background-color: var(--black-blue);
  opacity: 1;
  z-index: 50;

  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--spacing-l);

  transition: background-color 0.4s ease-in-out;
}

.ultra_transition > img {
  width: 30%;
}

.ultra_transition.animate {
  animation: slideInOut 2s both;
}

.default_transition {
  position: fixed;
  width: 105vw;
  height: 100vh;
  top: 0;
  transform: translateX(+120%);

  background-color: var(--black-blue);
  opacity: 1;
  z-index: 50;

  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--spacing-l);

  transition: background-color 0.4s ease-in-out;
}

.default_transition > img {
  width: 30%;
}

.default_transition.animate {
  animation: transitionExit 2s both;
}

@keyframes transitionExit {
  0% {
    transform: translateX(+100%);
    opacity: 1;
  }
  60% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(-100%);
    opacity: 1;
  }
}
</style>