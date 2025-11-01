<script>
    let { 
        issueData
    } = $props();
</script>

<div id="ABSTRACT" class="base_grid cow_element default_appear"> 
    <div class="cow_text">
        <p class="p2">
            {@html issueData?.CowElementText}
        </p>
    </div>

    <div class="cow_img">
        <img style="width: 100%;" src={issueData?.CowElementImg} alt="">
        <p class="d1">{@html issueData?.CowImgDidascalia}</p>
    </div>
</div>

<div id="ABSTRACT" class="base_grid ultra_appear"> 
    <div class="cow_text">
        <p class="p2">
            <strong>{issueData?.UltraCowElementTitle}</strong>
            <br>
            <br>
            {@html issueData?.UltraCowElementText}
        </p>
    </div>

    <div class="cow_img">
            <div class="base_grid gallery">
                {#each Array.from({ length: 10 }, (_, i) => i + 1) as imageIndex}
                    <div id={`image${imageIndex}`}>
                        <img src={`${issueData?.UltraGalleryFolder}/GALLERY_${imageIndex}.webp`} alt={`GALLERY_${imageIndex}`}>
                    </div>
                {/each}
            </div>

            <div class="switch_container">
                <p class="p1">NEXT →</p>
            </div>
    </div>
</div>

<style>
    .cow_element {
        padding: 0px var(--spacing-l);
    }

    .cow_text {
        grid-column: span 8;
        height: fit-content;
    }

    .cow_img {
        display: flex;
        height: auto;
        flex-direction: column;
        gap: var(--spacing-s);
        grid-column: span 8;
    }

    .cow_img img {
        width: 100%;
        height: auto;
        object-fit: cover;
        object-position: center;
    }
</style>