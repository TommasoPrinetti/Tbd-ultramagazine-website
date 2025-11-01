<script>
  let { 
    issueData
  } = $props();

  import { goto } from '$app/navigation';
</script>

<a class="single_issue" onclick={() => goto(`/issues/${issueData?.issueTitle}`)}>

    {#if issueData?.ultraHoverImg}
      <div class="single_issue_ultrahover">
        <img src={issueData.ultraHoverImg} alt="{issueData.issueTitle} Ultra mode">
      </div>
    {/if}
    
    <img src={issueData?.issueCover} alt={issueData?.issueTitle} />

    <p class="p3">
      TBD #{issueData?.issueTitle}
    </p>

      <p class="p3">
        {#if issueData?.issuePrice}
          {issueData?.issuePrice}€
        {:else}
          <i>Preorder soon!</i>
        {/if}
        
      </p>

</a>

<style>


.single_issue {
  display: flex;
  position: relative;

  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing_xs);
  flex-shrink: 0;
  grid-column: span 2;

  opacity: 50%;
  transition: transform 1s ease-in-out, opacity 1s ease-in-out;
}

.single_issue > .container {
  position: absolute;
  width: 100%;
  height: 100%;
}

.single_issue:hover {
  transform: translateY(-5%);

  opacity: 100%;

  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.single_issue_ultrahover {
  display: block;
  opacity: 0;
  width: 100%;

  transform: rotate(30deg);
  position: absolute;
  top: 0%;
  right: 0%;

  transition: opacity 1s ease-in-out;
}

body.ultra > div > div > section > a > .single_issue_ultrahover {
  display: block;

  opacity: 100%;
  transition: opacity 1s ease-in-out;

  mix-blend-mode: normal;
}

.single_issue img {
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
  object-fit: cover;
}

.single_issue img:hover {
  box-shadow: #ffffff 2px 90%;
}

.single_issue .p3 {
  text-transform: uppercase;
}

@media screen and (max-width: 480px) {
  .single_issue {
    gap: var(--spacing_xs);
    flex-shrink: 0;
    grid-column: span 1;
    opacity: 100%;
  }
}
</style>