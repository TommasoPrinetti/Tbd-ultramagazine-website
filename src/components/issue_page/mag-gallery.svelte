<script>
    let {
        images = []
    } = $props();
    
    let currentImageIndex = $state(0); 
    
    function cycleImages() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }
 </script>

 <div class="gallery default_appear">
    <h2>CLICK ME</h2>
    <section>
        {#each images as image, index}
            <button id={`image${index + 1}`} onclick={cycleImages} class:current={currentImageIndex === index}>
                <img src={image} alt={`GALLERY_${index + 1}`}>
            </button>
        {/each}
    </section>
</div>

<style>

.gallery {
  width: 100%;
  height: 80vh;
  overflow: hidden;
  align-items: center;

  aspect-ratio: 16/9;

  position: relative;

  display: flex;
  flex-shrink: 0;

  flex-direction: column;
  row-gap: var(--spacing-l);
  padding: 0px var(--spacing-l);
}

.gallery h2 {
  mix-blend-mode: difference;
}

.gallery section {
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  border: 0px;
}

.gallery > section > button {
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: 10%;
  display: none;
  align-items: center;
  justify-content: center;
}

.gallery > section > button.current {
  display: flex;
}

.gallery section button img {
  height: 70vh;
  object-fit: cover;
  aspect-ratio: 16/9;
}

@media screen and (max-width: 480px) {
  .gallery {
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }

  read > .gallery {
    display: flex;
  }

  .gallery {
    display: none;
  }

  .gallery section {
    height: fit-content;
  }

  .gallery section button img {
    width: 100%;
    aspect-ratio: 16/9;
    height: auto;
  }
}
</style>