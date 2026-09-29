<script>
    let { manifestoTitle, manifestoText, downloadPath, downloadText, fileDownloadButton } = $props();

</script>

<div class="manifesto base_grid" id="EDITORIALE">
        <h2>
            {manifestoTitle}
        </h2>
        <p class="p2">
            {@html manifestoText}
        </p>
        {#if fileDownloadButton === true}
            <a class="button" href={downloadPath} download={manifestoTitle}>
                <p class="p3">{downloadText}</p>
            </a>
        {/if}
</div >


<style>
    .manifesto {
        padding: var(--spacing-l);
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-m);
        align-items: center;
        width: 100%;
        height: fit-content;
    }

    .manifesto .p2 {
        width: 70%;
    }

@media screen and (max-width: 480px) {

    .manifesto {
        padding: var(--spacing-l) var(--spacing-s);
        display: flex;
        flex-direction: column;
        row-gap: var(--spacing-s);
        align-items: flex-start;
        flex: 1 0 0;
    }

    .manifesto .p2 {
        width: 100%;
    }
}
</style>


