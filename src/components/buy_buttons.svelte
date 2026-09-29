<script>
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    function handleClick() {
      dispatch('toggle'); 
    }
</script>
  
<button class="rounded_button" id="BUY_ACTIVE" onclick={handleClick} >
    <p class="p2"> BUY NOW </p>
</button>