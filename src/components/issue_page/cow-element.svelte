<script>
    let { 
        issueData
    } = $props();
    import { isUltraMode } from '$lib/store';
</script>

<div id="ABSTRACT" class="base_grid cow_element "> 
    <div class="cow_text">
        <p class="p2">
            {#if $isUltraMode}
                {@html issueData?.UltraCowElementText}
            {:else}
                {@html issueData?.CowElementText}
            {/if}
        </p>
    </div>

    <div class="cow_img">
        {#if $isUltraMode}
            <img style="width: 100%;" src={issueData?.UltraCowElementImg} alt="">
            <p class="d1">{@html issueData?.UltraCowImgDidascalia}</p>
        {:else}
            <img style="width: 100%;" src={issueData?.CowElementImg} alt="">
            <p class="d1">{@html issueData?.CowImgDidascalia}</p>
        {/if}
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

    @media screen and (max-width: 480px) {
        .cow_element {
            padding: var(--spacing-s);
        }

        .cow_text {
            grid-column: span 2;
        }

        .cow_img {
            grid-column: span 2;
        }
        
    }
</style>