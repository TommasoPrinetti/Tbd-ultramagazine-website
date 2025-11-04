<script lang="ts">
    import { onMount } from 'svelte';
    let { galleryFolderPath } = $props();
    let lengthNumber = $state(0);
    let currentImageIndex = $state(1);
    let consecutiveFailures = $state(0);
    const maxConsecutiveFailures = 3;

    function cycleImages() {
        currentImageIndex = (currentImageIndex % lengthNumber) + 1;
    }

    function preloadImage(index: number) {
        const img = new Image();
        img.onload = () => {
            lengthNumber = index;
            consecutiveFailures = 0; 
            preloadImage(index + 1);
        };
        img.onerror = () => {
            consecutiveFailures += 1;
            if (consecutiveFailures < maxConsecutiveFailures) {
                preloadImage(index + 1);
            }
        };
        img.src = `${galleryFolderPath}/GALLERY_${index}.webp`;
    }

    onMount(() => {
        preloadImage(1);
    });
</script>

{#if galleryFolderPath}
        <section class="gallery">
            {#each Array.from({ length: lengthNumber }, (_, i) => i + 1) as imageIndex}
                <button id={`image${imageIndex}`} class:current={currentImageIndex === imageIndex} onclick={cycleImages} aria-label={`View image ${imageIndex}`} type="button" style="border: none; background: none; padding: 0; cursor: pointer;">
                    <img src={`${galleryFolderPath}/GALLERY_${imageIndex}.webp`} alt={`GALLERY_${imageIndex}`}>
                </button>
            {/each}
        </section>
        <div class="switch_container" onclick={cycleImages} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { cycleImages(); } }} role="button" tabindex="0" aria-label="Next image">
            <p class="p1">NEXT →</p>
        </div>
{/if}


<style>


.switch_container {
  position: absolute;
  top: 50%;
  right: 2%;
  color: var(--white-blue);
}

.switch_container > .p1 {
  text-shadow: 3px 3px 3px #000000;
}


</style>