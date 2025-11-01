<script>

</script>

<section class="last_issue" id="LATEST">
  <h2 id="HEROTEXT_FILLING">
    ART BASEL 2025.
  </h2>

  <img class="last_issue_img" src='/ARTBASEL.png' alt="Last Issue">

  <div class="last_issue_text">
    <div style="display: flex; flex-direction: row; gap: var(--spacing-s);">
        <a class="rounded_button" style="z-index: 2;"
        href='https://www.liste.ch/en/home.html'
        target="_blank"
        rel="noopener noreferrer">
          <p class="p2">GO TO LIST</p>
        </a>
    </div>
  </div>
</section>

<!--
<BuyingSlider
  bind:isSliderOpen
  issueData={latestIssue}
/>-->


<style>


  .last_issue {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: var(--spacing_xs);
  }

  .last_issue_text {
    width: 50%;
    display: flex;
    padding: var(--Spacing_Zero, 0px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-s);
  }

  .last_issue_img {
    width: auto;
    height: auto;
    object-fit: cover;
    object-position: center;
  }


  @media screen and (max-width: 480px) {

    .last_issue {
      width: auto;
      height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--spacing-m);
      row-gap: var(--spacing-s);
      position: relative;
    }


    .last_issue_img {
      width: 100%;
      height: auto;
    }

    .last_issue_text {
      width: 100%;
      display: flex;
      padding: var(--Spacing_Zero, 0px);
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: var(--spacing-s);
    }
  }
</style>

