<script>
    let { 
        issueData,
    } = $props();

    import BuyButtons from '$components/buy_buttons.svelte';
    import BuyingSlider from '$components/sliders/buying_slider.svelte';

    let isSliderOpen = $state(false);

    function handleSliderToggle() {
        isSliderOpen = !isSliderOpen;
    }
  
</script>

    <div id="ISSUE" class="base_grid hero_section default_appear" >          
        <div class="hero_text vertical_flex"> 
            <h1>
                {@html issueData?.issueTitle}
            </h1>

            <p class="p2">
                {@html issueData?.issueHeroText}
            </p>

            {#if issueData?.issuePrice }
                <div class="buybuttons">
                    {#each [1, 2, 3] as _}
                        <BuyButtons on:toggle={handleSliderToggle} />
                    {/each}
                </div>
            {/if}
            
        </div>
        
        <div class="hero_img">
            <img src={issueData?.issueThumbnail} alt={issueData?.issueNumber}>
        </div>

    </div>

    <div class="base_grid hero_section ultra_appear">           
        <div class="herotextcontainer"> 
            <h1>
                {issueData?.UltraissueTitle}
            </h1>

            <h3>
                ../ {issueData?.issueNumber}_ULTRA
            </h3>

            <p class="p2">
                {issueData?.UltraissueHeroText}
            </p>
        </div>
        
        <div class="heroimgcontainer">
            <img class="heroimgcontainer" src={issueData?.UltraissueThumbnail}>
        </div>

    </div>

<BuyingSlider
  bind:isSliderOpen
  issueData={issueData}
/>

<style>

    
.hero_section {
  padding: 0px var(--spacing-l);
  border-bottom: var(--white-blue) 1px solid;
  border-top: var(--white-blue) 1px solid;
}

.hero_img {
    grid-column: span 8;
    border-left: 1px solid var(--white-blue);
    border-right: 1px solid var(--white-blue);
}

.hero_text {
    grid-column: span 8;
    padding: var(--spacing-xl) 0px;
    row-gap: var(--spacing-m);
    
}

.hero_text p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 5;
    -webkit-line-clamp: 5;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
}

@media screen and (max-width: 480px) {
  .hero_section {
    padding: var(--spacing-s);
  }

  .hero_text {
    grid-column: span 2;
    padding: var(--spacing-l) 0px 0px 0px;
  }

  .hero_text p {
    width: 98%;
  }

  .hero_img {
    grid-column: span 2;
    border: 1px solid var(--white-blue);
  }
}



</style>