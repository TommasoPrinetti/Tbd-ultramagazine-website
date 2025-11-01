<script lang="ts">
    import NotFound from "$components/notfound.svelte";
    import Header from "$components/header/header.svelte";

    // Access issues from layout data via props
    let { data } = $props();
    const issues = $derived(data?.issues || []);
</script>

<Header issuesData={issues}/>
<NotFound />