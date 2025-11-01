<script lang="ts">
  let { issuesData } = $props();

  import SingleIssue from '$components/issue_container/single_issue.svelte';
  import SingleCard from './single_card.svelte';
  import Divider from '$components/article/divider.svelte';

  // Filter issues by category
  const regularIssues = issuesData.filter((issue: any) => issue.issueCategory === 'issues' && issue.issueCover);
  const publications = issuesData.filter((issue: any) => issue.issueCategory === 'publications' && issue.issueCover);
  const specialProjects = issuesData.filter((issue: any) => issue.issueCategory === 'special projects' && issue.issueCover);
</script>

<!-- Regular Issues -->
<div class="vertical_flex">
  {#if regularIssues.length > 0}
    <Divider category="issues" />
      <div class="issues_container" id="ISSUES">
        <section>
          {#each regularIssues as issue (issue.issueTitle)}
            <SingleIssue issueData={issue} />
          {/each}
        </section>
      </div>
  {/if}
</div>

<!-- Publications -->
<div class="vertical_flex">
  {#if publications.length > 0}
  <Divider category="publications" />
    <div class="issues_container" id="PUBLICATIONS">
      <section>
        {#each publications as issue (issue.issueTitle)}
          <SingleIssue issueData={issue} />
        {/each}
      </section>
    </div>
  {/if}
</div>

<div class="vertical_flex">
  {#if specialProjects.length > 0}
  <Divider category="special projects" />
    <div class="issues_container" id="SPECIAL_PROJECTS">
      <div class="base_grid">
        {#each specialProjects as issue (issue.issueTitle)}
          <SingleCard issueData={issue} />
        {/each}
      </div>
    </div>
  {/if}
</div>


<style>

.issues_container {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing_xs);

  width: 100%;
  height: fit-content;

  padding: 0px var(--spacing-m);
}

.issues_container section {
  height: fit-content;
  column-gap: var(--spacing-m);
  grid-auto-flow: row;

  overflow: hidden;
}



@media screen and (max-width: 480px) {
  
  .issues_container section {
    padding: var(--spacing-s);
    column-gap: var(--spacing-s);
    grid-auto-flow: row;
    flex-wrap: wrap;
    overflow: hidden;
  }

}
</style>