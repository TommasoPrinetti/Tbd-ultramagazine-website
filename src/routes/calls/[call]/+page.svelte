<script lang="ts">
    let { data } = $props();
    import Header from "$components/header.svelte";
    import Manifesto from "$components/manifesto.svelte";
    import Footer from "$components/footer.svelte";

    let call = $derived(data?.call || {});
    
    // Format dates for display in European format (Italian locale)
    function formatDate(dateString: string | null | undefined, includeTime: boolean = false) {
      if (!dateString) return '';
      const date = new Date(dateString);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Rome',
      };
      
      if (includeTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
      }
      
      return date.toLocaleDateString('it-IT', options);
    }
    
    // Get current time string in Europe/Rome timezone for comparison
    function getEuropeTimeString(): string {
      const now = new Date();
      return now.toLocaleString('sv-SE', { timeZone: 'Europe/Rome' }); // ISO-like format YYYY-MM-DD HH:mm:ss
    }
    
    // Convert date to Europe/Rome timezone string for comparison
    function toEuropeTimeString(date: Date): string {
      return date.toLocaleString('sv-SE', { timeZone: 'Europe/Rome' });
    }
    
    // Get call status
    type CallStatus = 'not-yet-open' | 'active' | 'closed';
    
    let callStatus = $derived.by((): CallStatus => {
      if (!call?.openDate || !call?.endDate) return 'active'; // Default to active if dates missing
      
      const nowStr = getEuropeTimeString();
      const open = new Date(call.openDate);
      const end = new Date(call.endDate);
      
      // Convert dates to Europe/Rome timezone strings for accurate comparison
      const openStr = toEuropeTimeString(open);
      const endStr = toEuropeTimeString(end);
      
      if (nowStr < openStr) {
        return 'not-yet-open';
      } else if (nowStr >= openStr && nowStr <= endStr) {
        return 'active';
      } else {
        return 'closed';
      }
    });
    
    let manifestoProps = $derived({
      manifestoTitle: call?.title || '',
      manifestoText: call?.description || '',
      downloadPath: call?.downloadPdfUrl || call?.hrefExternal || '',
      downloadText: call?.ctaText || '',
      fileDownloadButton: !!(call?.downloadPdfUrl || call?.hrefExternal)
    });
</script>

{#key call?._id}
    <Header issuesData={data.issues} temporaryCalls={data.temporaryCalls}/>

  <div class="call_container vertical_flex" id="MANIFESTO">
    {#if call?.openDate || call?.endDate}
    <div class="call-dates">
      <div class="call-status-indicator status-{callStatus}">
        {#if callStatus === 'not-yet-open'}
          <p class="p2 status-text">📅 Call opens on {formatDate(call.openDate)}</p>
        {:else if callStatus === 'active'}
          <p class="p2 status-text">✅ Call is currently open</p>
        {:else if callStatus === 'closed'}
          <p class="p2 status-text">❌ Call has closed</p>
        {/if}
      </div>
    </div>
  {/if}
        <h1>
            {@html call?.title}
        </h1>
        <p class="p2">
            {@html call?.description}
        </p>
        <a href={call?.hrefExternal} class="rounded_button">
            <p class="p2">
                Download the call
            </p>
        </a>
    </div>

    <Footer />
{/key}

<style>
  .call-dates {
    padding: var(--spacing-s) var(--spacing-l);
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-s);
  }
  
  .call-status-indicator {
    padding: var(--spacing-s);
    border-radius: 8px;
    margin-bottom: var(--spacing-xs);
  }
  
  .call-status-indicator.status-not-yet-open {
    background-color: rgba(255, 193, 7, 0.1);
    border: 1px solid rgba(255, 193, 7, 0.3);
  }
  
  .call-status-indicator.status-active {
    background-color: rgba(40, 167, 69, 0.1);
    border: 1px solid rgba(40, 167, 69, 0.3);
  }
  
  .call-status-indicator.status-closed {
    background-color: rgba(220, 53, 69, 0.1);
    border: 1px solid rgba(220, 53, 69, 0.3);
  }
  
  .status-text {
    font-weight: 600;
    margin: 0;
  }

  .call_container {
        width: 60%;
        margin: 0 auto;
        padding: var(--spacing-l) 0px;
    }

    @media screen and (max-width: 480px) {
    .call_container {
        width: 100%;
        padding: var(--spacing-l) var(--spacing-s);
    }
    }
  
  @media screen and (max-width: 480px) {
    .call-dates {
      padding: var(--spacing-s);
    }
  }
</style>
